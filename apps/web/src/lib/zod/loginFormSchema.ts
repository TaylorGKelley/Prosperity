import type { User } from 'authentication-service-nextjs-sdk/server';
import z from 'zod';

const loginFormSchema = z.object({
	email: z.email({ message: 'Please enter a valid email.' }).trim(),
	password: z.string().trim(),
});

type LoginFormState =
	| {
			user: User | null;
			errors?: {
				email?: string[];
				password?: string[];
			};
			error?: string;
			values: {
				email?: string;
				password?: string;
			};
	  }
	| undefined;

export { loginFormSchema as default, type LoginFormState };
