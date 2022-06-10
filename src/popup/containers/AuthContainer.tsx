import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ApolloProvider } from '@apollo/client';
import { LoginContainer } from './LoginContainer';
import { ContentCenter } from '../components/ContentCenter';
import AppRoute from '../../common/containers/AppRoute';
import { useAPIClient } from '../../common/hooks/useAPIClient';
import { PopupLayout } from '../components/PopupLayout';
import { AuthContext } from '../contexts/AuthContext';

export const AuthContainer: FC<HTMLAttributes<Element>> = (): ReactElement => {
  const [storedToken, setStoredToken] = useState<string>('');
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.sync.get('token').then(({ token }) => {
      setStoredToken(token);
      setTokenLoaded(true);
    });
  }, [setStoredToken, setTokenLoaded]);

  const client = useAPIClient(storedToken);

  const handleLoginSuccess = useCallback(
    (token: string) => {
      chrome.storage.sync.set({ token });
      setStoredToken(token);
    },
    [setStoredToken],
  );

  const handleLogout = useCallback(() => {
    chrome.storage.sync.remove('token');
    setStoredToken('');
  }, [setStoredToken]);

  const authContextValue = useMemo(
    () => [Boolean(storedToken), handleLogout],
    [storedToken, setStoredToken],
  ) as AuthContextValue;

  return (
    <AuthContext.Provider value={authContextValue}>
      <ApolloProvider client={client}>
        {!tokenLoaded && <ContentCenter>Loading...</ContentCenter>}
        {Boolean(tokenLoaded) && !storedToken && (
          <LoginContainer onLoginSuccess={handleLoginSuccess} />
        )}
        {Boolean(tokenLoaded) && Boolean(storedToken) && (
          <PopupLayout>
            <AppRoute />
          </PopupLayout>
        )}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
