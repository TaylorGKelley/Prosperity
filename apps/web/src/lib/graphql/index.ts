import "server-only";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

export const createGraphClient = async () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
