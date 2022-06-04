import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import { styled } from '@linaria/react';
import { IconBack } from '../icons/IconBack';

export const BackButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
): ReactElement => (
  <StyledBackButton {...props}>
    <StyledIconBack />
    Back
  </StyledBackButton>
);

const StyledBackButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  color: var(--iconPrimaryColor);
  cursor: pointer;
`;

const StyledIconBack = styled(IconBack)`
  width: 12px;
  height: 12px;
  margin-right: calc(var(--fontBigSize) / 2);
  stroke: var(--iconPrimaryColor);
`;
