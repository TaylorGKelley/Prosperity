import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($accessToken: String!) {
    createBank(input: { accessToken: $accessToken }) {
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
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: String!) {
    deleteBank(id: $id) {
      id
    }
  }
`;
