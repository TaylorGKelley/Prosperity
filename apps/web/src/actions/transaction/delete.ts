'use server';

import { createGraphClient } from '@/lib/graphql';
import { DELETE_TRANSACTION } from '@/lib/graphql/queries/transactions';
import {
	type DeleteTransactionMutation,
	type DeleteTransactionMutationVariables,
} from '@/lib/graphql/schema/operations';
import { type UUID } from 'node:crypto';

export default async function deleteTransaction(
	id: UUID,
): Promise<DeleteTransactionMutation['deleteTransaction']> {
	const graphClient = await createGraphClient({ isInServerAction: true });
	const { data } = await graphClient.mutate<
		DeleteTransactionMutation,
		DeleteTransactionMutationVariables
	>({
		mutation: DELETE_TRANSACTION,
		variables: {
			id,
		},
	});

	return data!.deleteTransaction;
}
