import React from 'react';
import { styled } from '@linaria/react';
import { AppLink } from '../components/AppLink';
import { ROUTES } from '../../popup/constants/routes';

export function NotFound() {
  return (
    <StyledNotFoundContainer>
      <StyledHeading>Hmmm...</StyledHeading>
      <StyledText>You definitely shouldn&apos;t be there...</StyledText>
      <StyledLink to={ROUTES.DEFAULT}>Go to Main</StyledLink>
    </StyledNotFoundContainer>
  );
}

const StyledNotFoundContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

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

const StyledLink = styled(AppLink)`
  color: var(--primaryFontColor);
  opacity: 0.5;
`;
