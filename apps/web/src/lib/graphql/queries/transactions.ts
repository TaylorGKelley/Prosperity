import { gql } from "@apollo/client";

export const TRANSACTION_PAGE_QUERY = gql`
  query TransactionPage($monthDate: DateTime!, $budgetId: String!) {
    banks(budgetId: $budgetId) {
      id
      tellerId
      balance
      currency
      enrollmentId
      lastFour
      name
      color
      type
      subtype
      status
      institution {
        id
        name
      }
    }
    categories(monthDate: $monthDate, budgetId: $budgetId) {
      id
      name
      icon
      color
      amount
      totalSpent
      endDate
    }
    transactions(
      monthDate: $monthDate
      budgetId: $budgetId
      pagination: { count: 100 }
    ) {
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
        bank {
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

export const GET_ALL_TRANSACTIONS_QUERY = gql`
  query GetAllTransactions(
    $monthDate: DateTime!
    $budgetId: String!
    $pagination: PaginationInput!
  ) {
    transactions(
      monthDate: $monthDate
      budgetId: $budgetId
      pagination: $pagination
    ) {
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
        bank {
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

export const GET_TRANSACTIONS_WITH_PAGINATION = GET_ALL_TRANSACTIONS_QUERY;

export const SYNC_TRANSACTIONS_MUTATION = gql`
  mutation SyncTransactions {
    syncTransactions {
      status
      error
    }
  }
`;
