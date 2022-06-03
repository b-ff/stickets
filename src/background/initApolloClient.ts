import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { config } from '../config';

export function initApolloClient() {
  return chrome.storage.sync.get('token').then(({ token }) => {
    const httpLink = createHttpLink({
      uri: config.api.host,
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: token || '',
      },
    }));

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    chrome.runtime.onSuspend.addListener(() => {
      client.stop();
    });

    return client;
  });
}
