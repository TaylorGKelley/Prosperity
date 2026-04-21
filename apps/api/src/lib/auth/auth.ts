import 'dotenv/config';

import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { twoFactor } from 'better-auth/plugins';
import { passkey } from '@better-auth/passkey';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const authSettings = {
  appName: 'Prosperity',
  trustedOrigins: [process.env.WEB_URL],
  baseURL: process.env.BETTER_AUTH_BASE_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [twoFactor(), passkey()],
} as BetterAuthOptions;

export const auth = betterAuth({
  ...authSettings,
  // Placeholder drizzle adapter for use when generating migrations
  database: drizzleAdapter(
    {},
    {
      provider: 'pg',
    },
  ),
});
