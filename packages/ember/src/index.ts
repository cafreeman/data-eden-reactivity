import {
  buildCachedFetch as buildBaseCachedFetch,
  getUrl,
  type DataEdenCache,
  type DataEdenFetch,
  type ReactiveAdapter,
  type ReactiveSignal,
  type SignalCache,
} from '@data-eden/reactivity';
import { tracked } from '@glimmer/tracking';

class Wrapper<T> {
  @tracked value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export const adapter: ReactiveAdapter = {
  create<T>(value: T): ReactiveSignal<T> {
    return new Wrapper(value);
  },
};

function fnFactory(
  fetch: DataEdenFetch,
  cache: DataEdenCache,
  signalCache: SignalCache
) {
  return async function (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) {
    const key = getUrl(input);
    const res = await fetch(input, init).then((res) => res.json());
    const tx = await cache.beginTransaction();
    tx.set(key, res);
    await tx.commit();

    return signalCache.get(key);
  };
}

export function buildCachedFetch(fetch: DataEdenFetch) {
  buildBaseCachedFetch(fetch, adapter, fnFactory);
}
