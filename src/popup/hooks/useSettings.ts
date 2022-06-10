import { useContext } from 'react';
import { SettingsContext, SettingsContextValue } from '../contexts/SettingsContext';

export function useSettings(): SettingsContextValue {
  return useContext(SettingsContext);
}
