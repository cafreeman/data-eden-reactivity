// import { buildFetch } from '@data-eden/network';
// import { adapter } from '@data-eden/react';
// import { buildCachedFetch } from '@data-eden/reactivity';

// async function loggerMiddleware(
//   request: Request,
//   next: (request: Request) => Promise<Response>
// ): Promise<Response> {
//   console.log('request happening!');
//   return next(request);
// }

// const customFetch = buildFetch([loggerMiddleware]);

// export const cachedFetch = buildCachedFetch({ fetch: customFetch, adapter });

import { buildCache } from '@data-eden/cache';
import { buildFetch } from '@data-eden/network';
import { createSignal, Reaction, Signal } from '@signalis/core';
import { useCallback, useReducer, useRef, useState } from 'react';

function getUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return input;
  }

  if ('url' in input) {
    return input.url;
  }

  return input.toString();
}

const SIGNAL = Symbol('data-eden-signal');

function createHandler(): ProxyHandler<any> {
  return {
    get(target, prop, receiver) {
      if (prop === SIGNAL) {
        return target;
      }
      const value = target.value;
      const result = Reflect.get(value, prop, receiver);
      return result;
    },

    set(target, prop, value) {
      console.log('set', prop);
      const innerValue = target.value;
      const result = Reflect.set(innerValue, prop, value);
      console.log('innerValue', innerValue);
      target.value = innerValue;
      return result;
    },
  };
}

type WithSignal<T> = T & {
  [SIGNAL]: Signal<T>;
};

const EMPTY = [] as const;

function safeIncrement(x: number) {
  if (x == Number.MAX_SAFE_INTEGER) {
    return 0;
  }

  return x + 1;
}

export function buildCachedFetch() {
  const SignalCache = new Map<string, WithSignal<any>>();
  const fetch = buildFetch([]);
  const handler = createHandler();

  const cache = buildCache({
    hooks: {
      async commit(tx) {
        for await (const entry of tx.entries()) {
          const [key, entity] = entry;
          let withSignal = SignalCache.get(key);

          // Entity can also be string | number so we need to make sure it's actually an object here
          if (entity !== null && typeof entity === 'object') {
            if (withSignal === undefined) {
              withSignal = new Proxy(createSignal(entity, false), handler);

              SignalCache.set(key, withSignal);
            } else {
              Object.assign(withSignal, entity);
            }
          }
        }
      },
    },
  });

  return function <T>() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<T>();
    const [, forceUpdate] = useReducer(safeIncrement, 0);

    const reactionRef = useRef<Reaction>();

    const customFetch = useCallback(
      async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
        const key = getUrl(input);
        setLoading(true);

        const response = await fetch(input, init);
        const data = await response.json();

        const tx = await cache.beginTransaction();
        tx.set(key, data);
        await tx.commit();

        const withSignal = SignalCache.get(key) as WithSignal<T>;

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

        setLoading(false);

        return withSignal;
      },
      EMPTY
    );

    return { fetch: customFetch, loading, data: result };
  };
}
