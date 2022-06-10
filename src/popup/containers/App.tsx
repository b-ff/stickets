import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CurrentLocationContext } from '../contexts/CurrentLocationContext';
import { AuthContainer } from './AuthContainer';
import { themeStyles } from '../../common/theme';
import { ErrorCatcherContainer } from './ErrorCatcherContainer';
import { SettingsContainer } from './SettingsContainer';
import { CurrentLocationContainer } from './CurrentLocationContainer';

export function App() {
  const [currentLocation, setCurrentLocation] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      ([{ url }]: chrome.tabs.Tab[]) => {
        setCurrentLocation(new URL(url as string));
      },
    );
  }, [setCurrentLocation]);

  return (
    <ErrorCatcherContainer>
      <SettingsContainer>
        <CurrentLocationContainer>
          <BrowserRouter>
            <AuthContainer className={themeStyles} />
          </BrowserRouter>
        </CurrentLocationContainer>
      </SettingsContainer>
    </ErrorCatcherContainer>
  );
}
