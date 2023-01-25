import { buildCache } from '@data-eden/cache';
import type { buildFetch } from '@data-eden/network';
import type { ReactiveAdapter, ReactiveSignal } from './adapter.js';

export const SIGNAL = Symbol('data-eden-signal');

export type WithSignal<T> = T & {
  [SIGNAL]: ReactiveSignal<T>;
};
export type DataEdenFetch = ReturnType<typeof buildFetch>;
export type DataEdenCache = ReturnType<typeof buildCache>;
export type SignalCache = Map<string, WithSignal<any>>;
export type FunctionFactory<T> = (
  fetch: DataEdenFetch,
  cache: DataEdenCache,
  signalCache: SignalCache
) => T;

export function getUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return input;
  }

  if ('url' in input) {
    return input.url;
  }

  return input.toString();
}

export function createHandler(): ProxyHandler<any> {
  return {
    get(target, prop, receiver) {
      if (prop === SIGNAL) {
        return target;
      }
      console.log('prop', prop);
      const value = target.value;
      const result = Reflect.get(value, prop, receiver);
      return result;
    },

    set(target, prop, value) {
      const innerValue = target.value;
      const result = Reflect.set(innerValue, prop, value);
      target.value = innerValue;
      return result;
    },
  };
}

export function buildCachedFetch<T>(
  fetch: DataEdenFetch,
  adapter: ReactiveAdapter,
  fnFactory: FunctionFactory<T>
) {
  const signalCache = new Map<string, any>();
  const handler = createHandler();

  const cache = buildCache({
    hooks: {
      async commit(tx) {
        for await (let entry of tx.entries()) {
          console.log('entry', entry);
          const [key, entity] = entry;
          let withSignal = signalCache.get(key);

          // Entity can also be string | number so we need to make sure it's actually an object here
          if (entity !== null && typeof entity === 'object') {
            if (withSignal === undefined) {
              withSignal = new Proxy(adapter.create(entity), handler);

              signalCache.set(key, withSignal);
            } else {
              Object.assign(withSignal, entity);
            }
          }
        }
      },
    },
  });

  return fnFactory(fetch, cache, signalCache);
}
