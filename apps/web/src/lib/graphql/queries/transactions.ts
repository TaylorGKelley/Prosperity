import { gql } from '@apollo/client';

export const GET_TRANSACTIONS_WITH_PAGINATION = gql`
	query GetTransactionsWithPagination($monthDate: DateTime!, $pagination: CursorPaginationInput) {
		transactions(monthDate: $monthDate, pagination: $pagination) {
			items {
				id
				tellerId
				accountId
				categoryId
				amount
				date
				description
				status
				type
			}
			pageInfo {
				hasNextPage
				endCursor
				length
			}
		}
	}
`;

export const GET_TRANSACTION_BY_ID = gql`
	query GetTransactionById($id: ID!) {
		transaction(id: $id) {
			id
			accountId
			categoryId
			amount
			date
			description
			status
			type
		}
	}
`;

export const SYNC_TRANSACTIONS = gql`
	mutation SyncTransactions {
		syncTransactions {
			status
			error
		}
	}
`;

export const DELETE_TRANSACTION = gql`
	mutation DeleteTransaction($id: ID!) {
		deleteTransaction(id: $id)
	}
`;
