import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $budgetId: ID!
    $name: String!
    $icon: Icon!
    $color: Color!
    $amount: Float!
  ) {
    createCategory(
      input: {
        budgetId: $budgetId
        name: $name
        icon: $icon
        color: $color
        amount: $amount
      }
    ) {
      id
      name
      icon
      color
      amount
      totalSpent
      startDate
      endDate
      budget {
        id
        name
        color
        isDefault
      }
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
