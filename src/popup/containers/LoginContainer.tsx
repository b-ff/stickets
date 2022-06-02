import React, { FC, ReactElement, useCallback } from "react";
import { noop } from "../../common/utils";
import { ContentCenter } from "../components/ContentCenter";
import { LoginForm } from "../components/LoginForm";
import { useLoginMutation } from "../../common/graphql/__generated__/graphql";

type LoginContainerProps = {
  onLoginSuccess: (token: string) => void;
};

export const LoginContainer: FC<LoginContainerProps> = ({
  onLoginSuccess = noop,
}): ReactElement => {
  const [doLogin, { loading, error, data }] = useLoginMutation();

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
};
