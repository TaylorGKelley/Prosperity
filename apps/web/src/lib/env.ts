import z from 'zod';

// NEXT_PUBLIC for browser accessible variables
const publicSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

const serverSchema = z.object({
  INTERNAL_SECRET: z.string(),
});

export const env = {
  ...publicSchema.parse(process.env),
  ...(typeof window === 'undefined' ? serverSchema.parse(process.env) : {}),
};
