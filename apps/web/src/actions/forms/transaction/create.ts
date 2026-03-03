'use server';

import { type UUID } from 'node:crypto';
import { createGraphClient } from '@/lib/graphql';
import { CREATE_TRANSACTION } from '@/lib/graphql/queries/transactions';
import {
	type CreateTransactionMutation,
	type CreateTransactionMutationVariables,
} from '@/lib/graphql/schema/operations';
import createTransactionFormSchema, {
	type CreateTransactionFormState,
} from '@/lib/zod/createTransactionFormSchema';

export async function createTransaction(
	_prevState: CreateTransactionFormState | null,
	formData: FormData,
): Promise<CreateTransactionFormState> {
	try {
		// Validate input
		const result = createTransactionFormSchema.safeParse(Object.fromEntries(formData));

		if (!result.success) {
			return {
				transaction: null,
				errors: result.error.flatten().fieldErrors,
				values: Object.fromEntries(formData),
			};
		}

		const { title, amount, categoryId, transactionType, date, description } = result.data;

		// Send Graph Mutation
		const client = await createGraphClient({ isInServerAction: true });
		const { data } = await client.mutate<
			CreateTransactionMutation,
			CreateTransactionMutationVariables
		>({
			mutation: CREATE_TRANSACTION,
			variables: {
				title,
				amount,
				categoryId: categoryId as UUID,
				transactionType,
				date,
				description,
			},
		});

		return {
			transaction: data?.createTransaction,
			values: Object.fromEntries(formData),
		};
	} catch (error) {
		return {
			transaction: null,
			error: (error as Error).message,
			values: Object.fromEntries(formData),
		};
	}
}
