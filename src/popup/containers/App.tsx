import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CurrentLocationContext } from "./CurrentLocationContext";
import { AuthContainer } from "./AuthContainer";
import { theme } from "../../common/theme";

export function App() {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
      setCurrentLocation(new URL(url));
    });
  }, [setCurrentLocation]);

  return (
    <CurrentLocationContext.Provider value={currentLocation}>
      <BrowserRouter>
        <AuthContainer className={theme} />
      </BrowserRouter>
    </CurrentLocationContext.Provider>
  );
}
