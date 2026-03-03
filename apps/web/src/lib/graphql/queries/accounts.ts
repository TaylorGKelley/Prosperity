import { gql } from '@apollo/client';

export const GET_ALL_ACCOUNTS = gql`
	query GetAllAccounts {
		accounts {
			id
			currency
			enrollmentId
			lastFour
			name
			type
			subtype
			status
		}
	}
`;

export const CREATE_ACCOUNT = gql`
	mutation CreateAccount($accessToken: String!) {
		createAccount(input: { accessToken: $accessToken }) {
			id
		}
	}
`;

export const DELETE_ACCOUNT = gql`
	mutation DeleteAccount($id: ID!) {
		deleteAccount(id: $id)
	}
`;
