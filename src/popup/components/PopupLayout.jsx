import React from "react";
import { styled } from "@linaria/react";

export function PopupLayout({ children, footer }) {
  return (
    <>
      <StyledHeader>
        <StyledIcon>#</StyledIcon>Stickets
      </StyledHeader>
      <StyledMain>{children}</StyledMain>
      <StyledFooter>{footer}</StyledFooter>
    </>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  padding: 5px 10px;
  font-size: 12px;
  border-bottom: 1px solid var(--borderPrimaryColor);
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
  overflow-y: auto;
`;
const StyledFooter = styled.footer`
  padding: 10px;
`;
