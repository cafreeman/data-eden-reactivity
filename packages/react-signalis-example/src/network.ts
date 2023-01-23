import { buildFetch } from '@data-eden/network';
import { buildUseCachedFetch } from '@data-eden/react';

async function loggerMiddleware(
  request: Request,
  next: (request: Request) => Promise<Response>
): Promise<Response> {
  console.log('request happening!');
  return next(request);
}

const customFetch = buildFetch([loggerMiddleware]);

export const useCachedFetch = buildUseCachedFetch(customFetch);
