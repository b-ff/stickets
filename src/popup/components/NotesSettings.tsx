import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { NoteScope } from '../../common/graphql/__generated__/graphql';
import { Tabs } from '../enums/Tabs';
import { SettingsFieldNames } from '../enums/SettingsFieldNames';
import { SettingsForm } from '../components/SettingsForm';
import { SettingsDropdownField } from './SettingsDropdownField';

const defaultScopeOptions = [
  {
    label: 'This page',
    value: NoteScope.Page,
  },
  {
    label: 'This website',
    value: NoteScope.Site,
  },
  {
    label: 'Visible everywhere',
    value: NoteScope.Global,
  },
];

const defaultTabOptions = [
  {
    label: 'Notes on this page',
    value: Tabs.Page,
  },
  {
    label: 'Notes on this website',
    value: Tabs.Site,
  },
  {
    label: 'Notes visisble everywhere',
    value: Tabs.Global,
  },
  {
    label: 'All notes',
    value: Tabs.All,
  },
];

type NotesSettingsProps = HTMLAttributes<HTMLFormElement> & SettingsFormElement;

export const NotesSettings: FC<NotesSettingsProps> = ({
  onChange,
  ...props
}): ReactElement => (
  <SettingsForm title="Notes" {...props}>
    <SettingsDropdownField
      name={SettingsFieldNames.DefaultCreateScope}
      title="Default visibility for new notes"
      description="Choose what default visibility will be pre-selected for new notes"
      options={defaultScopeOptions}
      defaultValue={defaultScopeOptions[0] as any}
      onChange={onChange}
    />
    <SettingsDropdownField
      name={SettingsFieldNames.DefaultOpenTab}
      title="Default open tab"
      description="Choose what tab will be open by default when you open extension popup"
      options={defaultTabOptions}
      defaultValue={defaultTabOptions[0] as any}
      onChange={onChange}
    />
  </SettingsForm>
);
