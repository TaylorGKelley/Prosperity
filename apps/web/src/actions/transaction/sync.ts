'use server';

import { createGraphClient } from '@/lib/graphql';
import { SYNC_TRANSACTIONS } from '@/lib/graphql/queries/transactions';
import {
	type SyncTransactionsMutation,
	type SyncTransactionsMutationVariables,
} from '@/lib/graphql/schema/operations';

export default async function syncTransactions() {
	const graphClient = await createGraphClient({ isInServerAction: true });
	const { data } = await graphClient.mutate<
		SyncTransactionsMutation,
		SyncTransactionsMutationVariables
	>({
		mutation: SYNC_TRANSACTIONS,
	});

	return data?.syncTransactions;
}
