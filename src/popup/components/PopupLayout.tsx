import React, { FC, ReactElement } from 'react';
import { styled } from '@linaria/react';
import { Sidebar } from './Sidebar';

type PopupLayoutProps = React.HTMLAttributes<HTMLElement>;

export const PopupLayout: FC<PopupLayoutProps> = ({ children }): ReactElement => (
  <StyledPopupLayout>
    <StyledAside>
      <Sidebar />
    </StyledAside>
    <StyledMain>{children}</StyledMain>
  </StyledPopupLayout>
);

const StyledPopupLayout = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
`;

const StyledAside = styled.aside`
  position: relative;
  width: 40px;
  height: 100%;
  border-right: 1px solid var(--controlPrimaryColor);
`;

const StyledMain = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
`;
