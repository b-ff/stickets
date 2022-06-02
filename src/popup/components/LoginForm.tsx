import React, { FC } from "react";
import { styled } from "@linaria/react";
import { ContentCenter } from "./ContentCenter";

type LoginFormProps = {
  onSubmit: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, ...props }) => {
  return (
    <ContentCenter {...props}>
      <StyledHeading>
        Please, sign in
        <br />
        with Google
      </StyledHeading>
      <StyledText>
        This will allow you to keep your notes private as well as other people
        to share their notes with you
      </StyledText>
      <StyledButton onClick={onSubmit}>Sign-in with Google</StyledButton>
    </ContentCenter>
  );
};

const StyledHeading = styled.h1`
  font-size: 20px;
  color: var(--primaryFontColor);
  margin: 0 0 15px;
  padding: 0;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: var(--primaryFontColor);
  margin: 0 0 15px;
  padding: 0;
  opacity: 0.5;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  resize: none;
  color: var(--fontPrimaryColor);
  background-color: var(--brandColor);
  border: 1px solid var(--borderPrimaryColor);
  border-radius: 3px;
  cursor: pointer;
`;
