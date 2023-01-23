import type {
  DataEdenCache,
  ReactiveAdapter,
  ReactiveSignal,
  SignalCache,
  WithSignal,
} from '@data-eden/reactivity';
import { DataEdenFetch, SIGNAL, buildCachedFetch, getUrl } from '@data-eden/reactivity';
import { Reaction, createSignal } from '@signalis/core';
import { useCallback, useReducer, useRef, useState } from 'react';

const adapter: ReactiveAdapter = {
  create<T>(v: T): ReactiveSignal<T> {
    const s = createSignal<T>(v, false);

    return s;
  },
};

const EMPTY = [] as const;

function safeIncrement(x: number) {
  if (x == Number.MAX_SAFE_INTEGER) {
    return 0;
  }

  return x + 1;
}

function fnFactory(
  fetch: DataEdenFetch,
  cache: DataEdenCache,
  signalCache: SignalCache
): <T>() => {
  fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<WithSignal<T>>;
  loading: boolean;
  data: T | undefined;
} {
  return function <T>() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<T>();
    const [, forceUpdate] = useReducer(safeIncrement, 0);

    const reactionRef = useRef<Reaction>();

    const customFetch = useCallback(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
        const key = getUrl(input);
        setLoading(true);

        try {
          const response = await fetch(input, init);

          const data = await response.json();

          const tx = await cache.beginTransaction();
          tx.set(key, data);
          await tx.commit();

          const withSignal = signalCache.get(key) as WithSignal<T>;

          if (!reactionRef.current) {
            reactionRef.current = new Reaction(function (this: Reaction) {
              this.trap(() => {
                withSignal[SIGNAL].value;
                setResult(withSignal);
                forceUpdate();
              });
            });
            reactionRef.current.compute();
          }
          return withSignal;
        } finally {
          setLoading(false);
        }
      },
      EMPTY
    );

    return { fetch: customFetch, loading, data: result };
  };
}

export function buildUseCachedFetch(fetch: DataEdenFetch) {
  return buildCachedFetch<ReturnType<typeof fnFactory>>(fetch, adapter, fnFactory);
}
