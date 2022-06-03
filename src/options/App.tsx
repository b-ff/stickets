import React from 'react';
import { styled } from '@linaria/react';
import { theme } from '../common/theme';

export function App() {
  return (
    <StyledWrapper className={theme}>
      <h1>Here will be options!</h1>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section``;
