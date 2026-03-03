import { type User } from 'authentication-service-nextjs-sdk/server';
import z from 'zod';

const registerFormSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required.' }).trim(),
	lastName: z.string().min(1, { message: 'Last name is required.' }).trim(),
	email: z.email({ message: 'Please enter a valid email.' }).trim(),
	password: z.string().min(8, { message: 'Be at least 8 characters long' }).trim(),
	passwordConfirm: z.string().trim(),
});

type RegisterFormState =
	| {
			user: User | null;
			errors?: {
				firstName?: string[];
				lastName?: string[];
				email?: string[];
				password?: string[];
				passwordConfirm?: string[];
			};
			error?: string;
			values: {
				firstName?: string;
				lastName?: string;
				email?: string;
				password?: string;
				passwordConfirm?: string;
			};
	  }
	| undefined;

export { registerFormSchema as default, type RegisterFormState };
