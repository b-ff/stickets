import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  defaultSettingsContextValue,
  SettingsContext,
} from '../contexts/SettingsContext';
import { DEFAULT_SETTINGS } from '../defaultSettings';

export const SettingsContainer: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}): ReactElement => {
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [settings, setSettings] = useState(defaultSettingsContextValue.settings);

  const loadSettingsFromChromeStorage = useCallback(() => {
    console.log('Loading app settings from Chrome...');
    chrome.storage.sync.get('settings').then(({ settings: storedSettings }) => {
      setSettingsLoaded(true);
      setSettings({
        ...DEFAULT_SETTINGS,
        ...(storedSettings || {}),
      });
    });
  }, [setSettingsLoaded, setSettings]);

  const updateSettings = useCallback(
    (newSettings: any): Promise<void> => {
      return chrome.storage.sync
        .set({ settings: newSettings })
        .then(() => {
          console.log('Updating settings:', newSettings, {
            ...settings,
            ...newSettings,
          });
          setSettings({
            ...settings,
            ...newSettings,
          });
        })
        .catch((error) => {
          throw error;
        });
    },
    [settings, setSettings],
  );

  useEffect(() => {
    if (!settingsLoaded) {
      loadSettingsFromChromeStorage();
    }
  }, [settingsLoaded, loadSettingsFromChromeStorage]);

  console.log('Settings applied:', settings);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }} {...props}>
      {children}
    </SettingsContext.Provider>
  );
};
