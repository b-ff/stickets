import React, { useCallback, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { config } from "../../config";
import { LoginContainer } from "./LoginContainer";
import { ContentCenter } from "../components/ContentCenter";
import AppRoute from "../../common/containers/AppRoute";

export function AuthContainer() {
  const [storedToken, setStoredToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("token").then(({ token }) => {
      setStoredToken(token);
      setTokenLoaded(true);
    });
  }, [setStoredToken, setTokenLoaded]);

  const httpLink = createHttpLink({
    uri: config.api,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: storedToken ? storedToken : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handleLoginSuccess = useCallback((token) => {
    chrome.storage.sync.set({ token });
    setStoredToken(token);
  });

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
}
