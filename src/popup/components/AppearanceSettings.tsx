import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { SettingsFieldNames } from '../enums/SettingsFieldNames';
import { ThemeSettingsOptions } from '../enums/ThemeSettingsOptions';
import { SettingsForm } from '../components/SettingsForm';
import { SettingsDropdownField } from './SettingsDropdownField';

const themeOptions = [
  {
    label: 'Use system settings',
    value: ThemeSettingsOptions.Auto,
  },
  {
    label: 'Light',
    value: ThemeSettingsOptions.Light,
  },
  {
    label: 'Dark',
    value: ThemeSettingsOptions.Dark,
  },
];

type AppearanceSettingsProps = HTMLAttributes<HTMLFormElement> & SettingsFormElement;

export const AppearanceSettings: FC<AppearanceSettingsProps> = ({
  onChange,
  ...props
}): ReactElement => (
  <SettingsForm title="Appearance" {...props}>
    <SettingsDropdownField
      name={SettingsFieldNames.Theme}
      title="Theme"
      description="Choose whether you prefer to use the light or dark theme at the interface."
      options={themeOptions}
      defaultValue={themeOptions[0] as any}
      onChange={onChange}
    />
  </SettingsForm>
);
