import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { styled } from '@linaria/react';

type TitledColumnProps = HTMLAttributes<HTMLElement> & {
  columnTitle: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
};

export const TitledColumn: FC<TitledColumnProps> = ({
  columnTitle,
  actions,
  footer,
  children,
  ...props
}): ReactElement => (
  <StyledTitledColumn {...props}>
    <StyledToolbar>
      <StyledTitle>{columnTitle}</StyledTitle>
      {actions}
    </StyledToolbar>
    {children}
  </StyledTitledColumn>
);

const StyledTitledColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--fontBigSize) * 2) 0 calc(var(--fontBigSize) * 1.5);
`;

const StyledTitle = styled.h1`
  font-size: var(--fontBigSize);
`;
