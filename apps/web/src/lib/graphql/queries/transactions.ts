import { gql } from "@apollo/client";

export const TRANSACTION_PAGE_QUERY = gql`
  query TransactionPage($monthDate: DateTime!, $budgetId: String!) {
    banks(budgetId: $budgetId) {
      id
      currency
      enrollmentId
      lastFour
      name
      color
      type
      subtype
      status
    }
    categories(monthDate: $monthDate, budgetId: $budgetId) {
      id
      name
      icon
      color
      amount
      endDate
    }
  }
`;

export const GET_ALL_TRANSACTIONS_QUERY = gql`
  query GetAllTransactions(
    $monthDate: DateTime
    $budgetId: String!
    $limit: Int
    $cursor: String
  ) {
    transactions(monthDate: $monthDate, budgetId: $budgetId) {
      items {
        id
        tellerId
        amount
        date
        description
        status
        type
        category {
          id
          icon
          color
        }
        account {
          id
        }
      }
      pageInfo {
        length
        hasNextPage
        endCursor
      }
    }
  }
`;

export const SYNC_TRANSACTIONS_MUTATION = gql`
  mutation SyncTransactions {
    syncTransactions {
      status
      error
    }
  }
`;
