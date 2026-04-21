import { gql } from "@apollo/client";

export const BUDGET_PAGE_QUERY = gql`
  query BudgetPage($monthDate: DateTime!, $budgetId: String!) {
    budgets {
      id
      name
      color
      isDefault
    }
    categories(monthDate: $monthDate, budgetId: $budgetId) {
      id
      name
      icon
      color
      amount
      totalSpent
      startDate
      endDate
    }
    banks(budgetId: $budgetId) {
      id
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
    savingGoals(budgetId: $budgetId) {
      id
      title
      icon
      color
      targetAmount
      currentAmount
      contributionAmount
      lastContribution
      prioritize
    }
  }
`;

export const GET_ALL_BUDGETS_QUERY = gql`
  query GetAllBudgets {
    budgets {
      id
      name
      isDefault
    }
  }
`;
