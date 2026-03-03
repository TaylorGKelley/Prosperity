import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
	mutation CreateBudget {
		createBudget {
			id
		}
	}
`;
