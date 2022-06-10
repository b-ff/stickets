import React, { FC, HTMLAttributes, ReactNode, ReactElement, useCallback } from 'react';
import { styled } from '@linaria/react';
import { SettingsField } from './SettingsField';
import { CustomSelect } from './CustomSelect';
import { Props } from 'react-select';
import { SettingsFieldNames } from '../enums/SettingsFieldNames';

type SettingsDriodownFieldProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description?: ReactNode;
  name: SettingsFieldNames;
  options: Array<{ label: string; value: any }>;
  defaultValue?: any;
  onChange: SettingsFormChangeHandler;
};

export const SettingsDropdownField: FC<SettingsDriodownFieldProps> = ({
  title,
  description,
  name,
  options,
  defaultValue,
  onChange,
  ...props
}): ReactElement => {
  const handleChange = useCallback(
    (option: any) => onChange({ [name]: option.value }),
    [],
  );

  const defaultOption =
    defaultValue && defaultValue.label && defaultValue.value
      ? defaultValue
      : options.find(({ value }) => value === defaultValue);

  return (
    <SettingsField title={title} description={description} {...props}>
      <StyledCustomSelect
        name={name}
        options={options}
        defaultValue={defaultOption}
        onChange={handleChange}
      />
    </SettingsField>
  );
};

const StyledCustomSelect = styled<Props>(CustomSelect)`
  border: 1px solid var(--controlPrimaryColor);
  border-radius: 6px;

  & .stickets-select__control {
    border-radius: 6px;
  }
`;
