import React, { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react';
import { CurrentLocationContext } from '../contexts/CurrentLocationContext';

export const CurrentLocationContainer: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}): ReactElement => {
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
    <CurrentLocationContext.Provider value={currentLocation} {...props}>
      {children}
    </CurrentLocationContext.Provider>
  );
};
