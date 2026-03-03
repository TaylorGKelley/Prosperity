'use server';

import { createGraphClient } from '@/lib/graphql';
import { DELETE_CATEGORY } from '@/lib/graphql/queries/categories';
import {
	type DeleteCategoryMutation,
	type DeleteCategoryMutationVariables,
} from '@/lib/graphql/schema/operations';
import { type UUID } from 'node:crypto';

export type DeleteCategoryResult = {
	id: UUID | null;
	error?: string;
};

export async function deleteCategory(id: UUID): Promise<DeleteCategoryResult> {
	try {
		// Delete category
		const client = await createGraphClient({ isInServerAction: true });
		const { data } = await client.mutate<DeleteCategoryMutation, DeleteCategoryMutationVariables>({
			mutation: DELETE_CATEGORY,
			variables: {
				id,
			},
		});

		if (!data) throw new Error('Delete failed');

		return {
			id: data?.deleteCategory,
		};
	} catch (error) {
		return {
			id: null,
			error: (error as Error).message,
		};
	}
}
