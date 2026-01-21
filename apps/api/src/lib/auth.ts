import { betterAuth } from 'better-auth';

// Better-Auth instance
export const auth = betterAuth({
  // database:
  emailAndPassword: {
    enabled: true,
  },
});
