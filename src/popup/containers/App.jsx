import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CurrentLocationContext } from "./CurrentLocationContext";
import { theme } from "../theme";
import { config } from "../../../config";
import { NotesContainer } from "./NotesContainer";

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
});

export function App() {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
        setCurrentLocation(new URL(url));
      });
    }
  }, [setCurrentLocation]);

  return (
    <ApolloProvider client={client}>
      <CurrentLocationContext.Provider value={currentLocation}>
        <NotesContainer className={theme} />
      </CurrentLocationContext.Provider>
    </ApolloProvider>
  );
}
