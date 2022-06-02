import React, { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import Login from "../../common/queries/Login.graphql";
import { noop } from "../../common/utils";
import { ContentCenter } from "../components/ContentCenter";
import { LoginForm } from "../components/LoginForm";

const LOGIN = gql`
  ${Login}
`;

export function LoginContainer({ onLoginSuccess = noop }) {
  const [doLogin, { loading, error, data }] = useMutation(LOGIN);

  const handleSignIn = useCallback(() => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      doLogin({
        variables: {
          token,
        },
      });
    });
  }, [doLogin]);

  if (data && data.login && data.login.token) {
    onLoginSuccess(data.login.token);
  }

  return loading ? (
    <ContentCenter>Signing in...</ContentCenter>
  ) : (
    <LoginForm onSubmit={handleSignIn} />
  );
}