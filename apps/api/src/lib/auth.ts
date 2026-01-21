import { betterAuth } from 'better-auth';

// Better-Auth instance
export const auth = betterAuth({
  // database:
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
  },
});
