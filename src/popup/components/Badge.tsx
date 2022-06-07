import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement } from 'react';

export const Badge: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}): ReactElement => <StyledBadge {...props}>{children}</StyledBadge>;

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 20px;
  line-height: 20px;
  padding: 0 5px;
  font-size: var(--fontRegularSize);
  color: var(--textSecondaryColor);
  background-color: var(--controlSecondaryColor);
  border-radius: 10px;
  box-sizing: border-box;
`;
