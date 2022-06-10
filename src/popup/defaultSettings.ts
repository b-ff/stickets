import { Tabs } from './enums/Tabs';
import { SettingsFieldNames } from './enums/SettingsFieldNames';
import { ThemeSettingsOptions } from './enums/ThemeSettingsOptions';
import { NoteScope } from '../common/graphql/__generated__/graphql';

export const DEFAULT_SETTINGS = {
  [SettingsFieldNames.Theme]: ThemeSettingsOptions.Auto,
  [SettingsFieldNames.DefaultCreateScope]: NoteScope.Page,
  [SettingsFieldNames.DefaultOpenTab]: Tabs.Site,
};
