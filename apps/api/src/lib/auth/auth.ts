import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  // Placeholder drizzle adapter for use when generating migrations
  database: drizzleAdapter(
    {},
    {
      provider: 'pg',
    },
  ),
});
