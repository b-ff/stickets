import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config } from '../../config';

export const useAPIClient = (token = '') => {
  const httpLink = createHttpLink({
    uri: config.api.host,
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};
