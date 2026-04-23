import 'server-only';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { headers } from 'next/headers';

type CreateGraphClientOptions = {
  cookie?: string;
};

/**
 * Create an HttpLink that forwards the provided cookie (or the incoming
 * Next request cookie) to the API. Accepts an optional `cookie` parameter
 * so callers (like route handlers) can explicitly pass req.headers.get('cookie').
 */
const createHttpLinkWithCookies = async (cookie?: string) => {
  const resolvedCookie =
    cookie ??
    (typeof headers !== 'undefined'
      ? ((await headers()).get('cookie') ?? '')
      : '');

  return new HttpLink({
    uri: `${process.env.API_URL}/graphql`,
    // Provide a fetch wrapper that injects the cookie header while preserving any existing headers.
    fetch: (uri, options = {}) => {
      const incoming = options.headers ?? {};
      const normalized = new Headers(incoming as HeadersInit);
      if (resolvedCookie) {
        normalized.set('cookie', resolvedCookie);
      }
      return fetch(typeof uri === 'string' ? uri : uri.toString(), {
        ...options,
        headers: normalized,
        // ensure credentials are included if the server expects them
        credentials: 'include',
      } as RequestInit);
    },
    credentials: 'include',
  });
};

export const createGraphClient = async (opts?: CreateGraphClientOptions) => {
  const httpLink = await createHttpLinkWithCookies(opts?.cookie);

  return new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
