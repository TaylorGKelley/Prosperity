import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($accessToken: String!) {
    createBank(input: { accessToken: $accessToken }) {
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
  }
`;
