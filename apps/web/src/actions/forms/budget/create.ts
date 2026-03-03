'use server';

import { createGraphClient } from '@/lib/graphql';
import { CREATE_BUDGET } from '@/lib/graphql/queries/budgets';

export default async function createBudget() {
	try {
		const graphClient = await createGraphClient({ isInServerAction: true });
		await graphClient.mutate({
			mutation: CREATE_BUDGET,
		});

		return {};
	} catch (error) {
		return {
			error: (error as Error).message,
		};
	}
}
