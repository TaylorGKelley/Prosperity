'use server';

import { createGraphClient } from '@/lib/graphql';
import { GET_TRANSACTIONS_WITH_PAGINATION } from '@/lib/graphql/queries/transactions';
import {
	type GetTransactionsWithPaginationQuery,
	type GetTransactionsWithPaginationQueryVariables,
} from '@/lib/graphql/schema/operations';
import Cursor from '@/lib/graphql/utils/Cursor';
import { type UUID } from 'node:crypto';

export type GetAllTransactionsResult =
	| {
			success: true;
			items: GetTransactionsWithPaginationQuery['transactions']['items'];
			pageInfo: GetTransactionsWithPaginationQuery['transactions']['pageInfo'];
	  }
	| {
			success: false;
			error: string;
	  };

export default async function getAllTransactions(
	filterInfo: {
		count: number;
		monthDate?: Date;
		cursor?: {
			date: Date;
			id: UUID;
		};
	},
	config?: { fromServerComponent: boolean },
): Promise<GetAllTransactionsResult> {
	try {
		const graphClient = await createGraphClient({
			isInServerAction: config?.fromServerComponent == true ? false : true,
		});
		const { data } = await graphClient.query<
			GetTransactionsWithPaginationQuery,
			GetTransactionsWithPaginationQueryVariables
		>({
			query: GET_TRANSACTIONS_WITH_PAGINATION,
			variables: {
				monthDate: filterInfo.monthDate || new Date(),
				pagination: {
					count: filterInfo.count,
					cursor: filterInfo.cursor && Cursor.encode(filterInfo.cursor),
				},
			},
		});

		return {
			success: true,
			items: data.transactions.items,
			pageInfo: data.transactions.pageInfo,
		};
	} catch (error) {
		return {
			success: false,
			error: (error as Error).message,
		};
	}
}
