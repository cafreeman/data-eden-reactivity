import { set } from 'lodash';
import type { DataEdenCache, SignalCache, WithSignal } from './cached-fetch.js';
import { parseEntities } from './parse-entities.js';

function getKey(v: { id: string; __type: string }) {
  return `${v.__type}:${v.id}`;
}

let fakeRevisionCounter = 0;

export async function handleResponse<T>(
  cache: DataEdenCache,
  signalCache: SignalCache,
  data: any
): Promise<WithSignal<T>> {
  const tx = await cache.beginTransaction();
  const key = getKey(data);

  // postorder DFS starting from the root entity, will return children before parents
  const entities = parseEntities(data);

  const childEntities: Array<any> = [];

  for (const { parent, prop, entity } of entities) {
    const key = getKey(entity);

    // replace the entity object with the key we're using to store it in the cache so that we can
    // later replace the key with the reactive entity
    // e.g. { pet: { id: 1, name: hitch }} -> { pet: 'pet:1' }
    if (parent && prop) {
      set(parent, prop, key);
      childEntities.push([prop, key]);
    }

    // @ts-ignore
    await tx.merge(key, { entity, revision: fakeRevisionCounter++ });
  }

  await tx.commit();

  const result = signalCache.get(key);

  // This is where we replace the child entity keys with their reactive cache entries
  childEntities.forEach(([prop, key]) => {
    set(result, prop, signalCache.get(key));
  });

  return result;
}
