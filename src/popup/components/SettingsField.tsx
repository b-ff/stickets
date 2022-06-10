import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

type SettingsFieldProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description: ReactNode;
};

export const SettingsField: FC<SettingsFieldProps> = ({
  title,
  description,
  children,
  ...props
}): ReactElement => (
  <StyledSettingsField {...props}>
    <StyledSettingsFieldLabel>{title}</StyledSettingsFieldLabel>
    <StyledSettingsFieldInputContainer>{children}</StyledSettingsFieldInputContainer>
    <StyledSettingsFieldDescription>{description}</StyledSettingsFieldDescription>
  </StyledSettingsField>
);

const StyledSettingsField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--fontBigSize) 0;
  color: var(--textPrimaryColor);
  font-size: var(--fontRegularSize);
  font-weight: 600;
`;

const StyledSettingsFieldLabel = styled.label`
  margin: 0 0 var(--fontBigSize);
  padding: 0;
  font-weight: normal;
`;

const StyledSettingsFieldInputContainer = styled.div`
  margin: 0 0 var(--fontBigSize);
  padding: 0;
  font-weight: normal;
`;

const StyledSettingsFieldDescription = styled.small`
  color: var(--textSecondaryColor);
  font-size: var(--fontSmallSize);
  font-weight: normal;
`;
