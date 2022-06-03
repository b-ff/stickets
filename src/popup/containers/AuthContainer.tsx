import React, { FC, HTMLAttributes, ReactElement, useCallback, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config } from '../../config';
import { LoginContainer } from './LoginContainer';
import { ContentCenter } from '../components/ContentCenter';
import AppRoute from '../../common/containers/AppRoute';

export const AuthContainer: FC<HTMLAttributes<Element>> = (): ReactElement => {
  const [storedToken, setStoredToken] = useState<string | null>();
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.sync.get('token').then(({ token }) => {
      setStoredToken(token);
      setTokenLoaded(true);
    });
  }, [setStoredToken, setTokenLoaded]);

  const httpLink = createHttpLink({
    uri: config.api.host,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: storedToken ? storedToken : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handleLoginSuccess = useCallback(
    (token: string) => {
      chrome.storage.sync.set({ token });
      setStoredToken(token);
    },
    [setStoredToken],
  );

  return (
    <ApolloProvider client={client}>
      {tokenLoaded ? (
        storedToken ? (
          <AppRoute />
        ) : (
          <LoginContainer onLoginSuccess={handleLoginSuccess} />
        )
      ) : (
        <ContentCenter>Loading...</ContentCenter>
      )}
    </ApolloProvider>
  );
};
