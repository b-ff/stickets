import React, {
  FC,
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  ReactElement,
  ReactNode,
} from 'react';
import { styled } from '@linaria/react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: MutableRefObject<any>;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref): ReactElement => (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  ),
);

const StyledButton = styled.button`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: calc(var(--fontBigSize) / 2) var(--fontBigSize);
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  line-height: 20px;
  color: #ffffff;
  background: linear-gradient(
    90deg,
    var(--buttonPrimaryColor) 0%,
    var(--buttonSecondaryColor) 100%
  );
  border: none;
  box-sizing: border-box;
  cursor: pointer;

  & svg {
    stroke: #ffffff;
  }

  &:disabled {
    background: var(--textTertiaryColor);
    color: var(--backgroundPrimaryColor);
    cursor: default;
    pointer-events: none;
    & svg {
      stroke: var(--backgroundPrimaryColor);
    }
  }
`;
