import React, { FC, ReactElement } from 'react';
import { styled } from '@linaria/react';

type ContentCenterProps = React.HTMLAttributes<HTMLElement>;

export const ContentCenter: FC<ContentCenterProps> = ({
  children,
  ...props
}): ReactElement => <StyledAuthContainer {...props}>{children}</StyledAuthContainer>;

const StyledAuthContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--fontBigSize);
  text-align: center;
  font-size: var(--fontBigSize);
  box-sizing: border-box;
`;
