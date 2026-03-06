'use server';

import { createGraphClient } from '@/lib/graphql';
import { DELETE_ACCOUNT } from '@/lib/graphql/queries/accounts';
import {
	type DeleteAccountMutation,
	type DeleteAccountMutationVariables,
} from '@/lib/graphql/schema/operations';
import { type UUID } from 'node:crypto';

type DeleteAccountResult = {
	success: boolean;
	error?: string;
};

export default async function deleteAccount(id: UUID): Promise<DeleteAccountResult> {
	try {
		const graphClient = await createGraphClient({ isInServerAction: true });
		await graphClient.mutate<DeleteAccountMutation, DeleteAccountMutationVariables>({
			mutation: DELETE_ACCOUNT,
			variables: { id },
		});

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: (error as Error).message,
		};
	}
}
