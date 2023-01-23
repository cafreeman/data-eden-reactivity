import { buildCachedFetch } from '@data-eden/ember';
import { buildFetch } from '@data-eden/network';

async function loggerMiddleware(request, next) {
  console.log('request happening!');
  return next(request);
}

const customFetch = buildFetch([loggerMiddleware], {
  fetch: function (input, init) {
    return globalThis.fetch(input, init);
  },
});

export const cachedFetch = buildCachedFetch(customFetch);
