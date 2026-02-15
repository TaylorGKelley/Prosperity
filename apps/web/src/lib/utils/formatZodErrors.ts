import { z } from "zod";

// A reusable helper to format Zod errors without using .flatten()
export const formatZodErrors = (error: z.ZodError) => {
  return error.issues.reduce((acc: Record<string, string[]>, issue) => {
    const path = issue.path[0] as string; // Get the field name
    if (!acc[path]) {
      acc[path] = [];
    }
    acc[path].push(issue.message);
    return acc;
  }, {});
};
