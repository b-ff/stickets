import React, { FC, ReactElement, ReactNode } from 'react';
import { styled } from '@linaria/react';
import { AppLink } from '../../common/components/AppLink';

type PopupLayoutProps = React.HTMLAttributes<HTMLElement> & {
  footer: ReactNode;
};

export const PopupLayout: FC<PopupLayoutProps> = ({ children, footer }): ReactElement => (
  <>
    <StyledHeader>
      <StyledIcon>#</StyledIcon>Stickets
    </StyledHeader>
    <StyledMain>{children}</StyledMain>
    <StyledFooter>{footer}</StyledFooter>
  </>
);

const StyledHeader = styled.header`
  width: 100%;
  padding: 5px 10px;
  font-size: 12px;
  box-sizing: border-box;
`;

const StyledIcon = styled.span`
  display: inline-block;
  color: var(--brandColor);
  font-weight: bold;
  margin-right: 2px;
`;

const StyledMain = styled.main`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;
const StyledFooter = styled.footer`
  padding: 10px;
`;

const StyledLink = styled(AppLink)`
  display: inline-block;
  margin-left: auto;
  color: var(--fontPrimaryColor);
`;
