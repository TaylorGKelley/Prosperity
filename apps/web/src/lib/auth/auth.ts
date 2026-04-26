import { passkey } from '@better-auth/passkey';
import { nextCookies } from 'better-auth/next-js';
import { twoFactor } from 'better-auth/plugins';
import { createAuthClient } from 'better-auth/react';
import { env } from '../env';

export const authClient = createAuthClient({
  basePath: '/api/auth',
  baseURL: env.NEXT_PUBLIC_API_URL,
  plugins: [nextCookies(), twoFactor(), passkey()],
});
