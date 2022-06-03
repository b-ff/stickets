import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CurrentLocationContext } from './CurrentLocationContext';
import { AuthContainer } from './AuthContainer';
import { themeStyles } from '../../common/theme';

export function App() {
  const [currentLocation, setCurrentLocation] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]: chrome.tabs.Tab[]) => {
      setCurrentLocation(new URL(url as string));
    });
  }, [setCurrentLocation]);

  return (
    <CurrentLocationContext.Provider value={currentLocation}>
      <BrowserRouter>
        <AuthContainer className={themeStyles} />
      </BrowserRouter>
    </CurrentLocationContext.Provider>
  );
}
