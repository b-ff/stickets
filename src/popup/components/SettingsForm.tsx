import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

type SettingsFormProps = HTMLAttributes<HTMLFormElement> & {
  title?: ReactNode;
};

export const SettingsForm: FC<SettingsFormProps> = ({
  title,
  children,
  onSubmit,
  ...props
}): ReactElement => {
  return (
    <StyledForm onSubmit={onSubmit} {...props}>
      {Boolean(title) && <StyledFormTitle>{title}</StyledFormTitle>}
      {children}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: var(--fontBigSize);
  overflow-y: auto;
  box-sizing: border-box;
`;

const StyledFormTitle = styled.h2`
  padding: var(--fontBigSize) 0 calc(var(--fontBigSize) * 2);
  font-size: var(--fontBigSize);
  font-weight: 600;
`;
