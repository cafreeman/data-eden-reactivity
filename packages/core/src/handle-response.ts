import type { DataEdenCache, SignalCache, WithSignal } from './cached-fetch.js';
import { parseEntities } from './parse-entities.js';
import { set } from 'lodash';

function getKey(v: { id: string; __type: string }) {
  return `${v.__type}:${v.id}`;
}

export async function handleResponse<T>(
  cache: DataEdenCache,
  signalCache: SignalCache,
  data: any
): Promise<WithSignal<T>> {
  const tx = await cache.beginTransaction();
  const key = getKey(data);

  const entities = parseEntities(data);

  entities.forEach(({ parent, prop, entity }) => {
    const key = getKey(entity);

    if (parent && prop) {
      set(parent, prop, key);
    }

    tx.set(key, entity);
  });

  await tx.commit();

  return signalCache.get(key) as WithSignal<T>;
}
