import { styled } from "@linaria/react";
import React from "react";

export function ContentCenter({ children, ...props }) {
  return <StyledAuthContainer {...props}>{children}</StyledAuthContainer>;
}

const StyledAuthContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  padding: 15px;
  box-sizing: border-box;
`;
