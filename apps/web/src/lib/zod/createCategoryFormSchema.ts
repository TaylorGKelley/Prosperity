import z from 'zod';
import { type Category } from '../graphql/schema/operations';

const createCategoryFormSchema = z.object({
	name: z.string().nonempty('Invalid Name'),
	amount: z.coerce.number('Invalid Amount').positive(),
});

type CreateCategoryFormState =
	| {
			category?: Category | null;
			errors?: {
				name?: string[];
				amount?: string[];
			};
			error?: string;
			values: {
				name?: string;
				amount?: string;
			};
	  }
	| undefined;

export { createCategoryFormSchema as default, type CreateCategoryFormState };
