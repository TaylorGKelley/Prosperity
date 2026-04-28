import z from 'zod';

const publicSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().min(1),
  NEXT_PUBLIC_WEB_URL: z.string().min(1),
  NEXT_PUBLIC_TELLER_APPLICATION_ID: z.string().optional(),
  NEXT_PUBLIC_TELLER_ENVIRONMENT: z.string().optional(),
});

const serverSchema = z.object({
  // Add server-only variables here
});

// We explicitly map the variables so Next.js can statically replace them
const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  NEXT_PUBLIC_TELLER_APPLICATION_ID: process.env.NEXT_PUBLIC_TELLER_APPLICATION_ID,
  NEXT_PUBLIC_TELLER_ENVIRONMENT: process.env.NEXT_PUBLIC_TELLER_ENVIRONMENT,
};

const parsedPublic = publicSchema.safeParse(processEnv);

if (!parsedPublic.success) {
  console.error('❌ Invalid environment variables:', parsedPublic.error.format());
  throw new Error('Invalid environment variables');
}

export const env = {
  ...parsedPublic.data,
  ...(typeof window === 'undefined' ? serverSchema.parse(process.env) : {}),
};
