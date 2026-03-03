import z from 'zod';

const logoutFormSchema = z.object({});

type LogoutFormState =
	| {
			error?: string;
	  }
	| undefined;

export { logoutFormSchema as default, type LogoutFormState };
