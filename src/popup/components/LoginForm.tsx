import React, { FC } from 'react';
import { styled } from '@linaria/react';
import { ContentCenter } from './ContentCenter';
import { Button } from './Button';

type LoginFormProps = {
  onSubmit: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, ...props }) => {
  return (
    <ContentCenter {...props}>
      <StyledHeading>Please, sign in with Google</StyledHeading>
      <StyledText>
        This will allow you to keep your notes private as well as other people to share
        their notes with you
      </StyledText>
      <StyledButton onClick={onSubmit}>Sign-in with Google</StyledButton>
    </ContentCenter>
  );
};

const StyledHeading = styled.h1`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const StyledText = styled.p`
  font-size: var(--fontRegularSize);
  color: var(--textSecondaryColor);
  margin: var(--fontBigSize) 0;
  padding: 0;
`;

const StyledButton = styled<any>(Button)`
  border-radius: 3px;
`;
