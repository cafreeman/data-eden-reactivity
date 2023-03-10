import type {
  DataEdenCache,
  DataEdenFetch,
  ReactiveAdapter,
  ReactiveSignal,
  SignalCache,
  WithSignal,
} from '@data-eden/reactivity';
import { traverse } from '@data-eden/reactivity';
import { SIGNAL, buildCachedFetch, handleResponse } from '@data-eden/reactivity';
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

// function getKey(v: { id: string; __type: string }) {
//   return `${v.__type}:${v.id}`;
// }

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
        setLoading(true);

        try {
          const response = await fetch(input, init);
          const data = await response.json();

          const withSignal = (await handleResponse(cache, signalCache, data)) as WithSignal<T>;

          if (!reactionRef.current) {
            const reaction = new Reaction(() => {
              setResult(withSignal);
              forceUpdate();
            });

            reaction.trap(() => {
              console.log('running trap');

              traverse(withSignal[SIGNAL].value, (_key, value, _parent) => {
                // DFS through the root object and if we find any other signals, we also subscribe
                // to them so that deeply nested updates propagate through to React
                if (value && value[SIGNAL]) {
                  value[SIGNAL].value;
                  return true;
                }

                if (Array.isArray(value)) {
                  return true;
                }

                return false;
              });
            });

            reactionRef.current = reaction;
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
