import { createContext } from 'react';
import { SettingsFieldNames } from '../enums/SettingsFieldNames';

type Settings<T> = {
  settings: T | {};
  updateSettings: (settings: T) => Promise<void>;
};

export type SettingsContextValue = Settings<typeof SettingsFieldNames>;

export const defaultSettingsContextValue = {
  settings: {},
  updateSettings: () => Promise.resolve(),
};

export const SettingsContext = createContext<SettingsContextValue>(
  defaultSettingsContextValue,
);
