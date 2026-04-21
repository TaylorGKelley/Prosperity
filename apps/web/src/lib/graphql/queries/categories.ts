import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $budgetId: String!
    $name: String!
    $icon: IconEnum!
    $color: ColorEnum!
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
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
