'use server';

import { createGraphClient } from '@/lib/graphql';
import { CREATE_CATEGORY } from '@/lib/graphql/queries/categories';
import {
	type CreateCategoryMutation,
	type CreateCategoryMutationVariables,
} from '@/lib/graphql/schema/operations';
import createCategoryFormSchema, {
	type CreateCategoryFormState,
} from '@/lib/zod/createCategoryFormSchema';

export async function createCategory(
	_prevState: CreateCategoryFormState | null,
	formData: FormData,
): Promise<CreateCategoryFormState> {
	try {
		// Validate input
		const result = createCategoryFormSchema.safeParse(Object.fromEntries(formData));

		if (!result.success) {
			return {
				category: null,
				errors: result.error.flatten().fieldErrors,
				values: Object.fromEntries(formData),
			};
		}

		const { name, amount } = result.data;

		// Send Graph Mutation
		const client = await createGraphClient({ isInServerAction: true });
		const { data } = await client.mutate<CreateCategoryMutation, CreateCategoryMutationVariables>({
			mutation: CREATE_CATEGORY,
			variables: {
				name,
				amount,
			},
		});

		return {
			category: data?.createCategory,
			values: Object.fromEntries(formData),
		};
	} catch (error) {
		return {
			category: null,
			error: (error as Error).message,
			values: Object.fromEntries(formData),
		};
	}
}
