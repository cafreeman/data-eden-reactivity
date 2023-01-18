import type { buildCache } from '@data-eden/cache';
import type { buildFetch } from '@data-eden/network';
import type { ReactiveAdapter } from './adapter.js';

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
      const result = Reflect.get(target, prop, receiver);
      if (prop !== SIGNAL) {
        const s = target[SIGNAL];
        s.read();
      }
      return result;
    },

    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      if (prop !== SIGNAL) {
        console.log('writing signal');
        const s = target[SIGNAL];
        s.write(s.read() === 0 ? 1 : 0);
      }
      return result;
    },
  };
}

interface CachedFetchArgs {
  fetch: ReturnType<typeof buildFetch>;
  cache: ReturnType<typeof buildCache>;
  adapter: ReactiveAdapter;
}

export function buildCachedFetch({ fetch, cache, adapter }: CachedFetchArgs) {
  const SignalCache = new Map<string, any>();

  const handler = createHandler();

  return async function (input: RequestInfo | URL, init?: RequestInit | undefined) {
    const key = getUrl(input);
    const res = await fetch(input, init).then((res) => res.json());

    const tx = await cache.beginTransaction();
    tx.set(key, res);
    await tx.commit();

    const cacheResult = await cache.get(key);

    let withSignal = SignalCache.get(key);

    if (withSignal === undefined) {
      const base = {
        ...cacheResult,
        [SIGNAL]: adapter.create(1),
      };
      withSignal = new Proxy(base, handler);

      SignalCache.set(key, withSignal);
    } else {
      Object.assign(withSignal, cacheResult);
      console.log('withSignal', withSignal);
    }

    return withSignal;
  };
}
