import { buildCachedFetch } from '@data-eden/reactivity';
import { adapter } from '@data-eden/react';
import { buildCache } from '@data-eden/cache';
import { buildFetch } from '@data-eden/network';

async function loggerMiddleware(
  request: Request,
  next: (request: Request) => Promise<Response>
): Promise<Response> {
  console.log('request happening!');
  return next(request);
}

const customFetch = buildFetch([loggerMiddleware], {
  fetch: function (input, init) {
    return globalThis.fetch(input, init);
  },
});

const cache = buildCache();

console.log(adapter);

export const cachedFetch = buildCachedFetch({ fetch: customFetch, cache, adapter });
