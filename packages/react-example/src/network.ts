import { buildFetch } from '@data-eden/network';
import { adapter } from '@data-eden/react';
import { buildCachedFetch } from '@data-eden/reactivity';

async function loggerMiddleware(
  request: Request,
  next: (request: Request) => Promise<Response>
): Promise<Response> {
  console.log('request happening!');
  return next(request);
}

const customFetch = buildFetch([loggerMiddleware]);

export const cachedFetch = buildCachedFetch({ fetch: customFetch, adapter });
