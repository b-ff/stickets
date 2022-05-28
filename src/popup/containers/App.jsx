import React, { useEffect, useState } from "react";
import { CurrentLocationContext } from "./CurrentLocationContext";
import { theme } from "../theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { config } from "../../../config";
import { NotesContainer } from "./NotesContainer";

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
});

export function App() {
  const [currentTab, setCurrentTab] = useState({});

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const location = document.createElement("a");
      location.href = tab.url;
      const enchancedTab = {
        ...tab,
        location,
      };

      setCurrentTab(enchancedTab);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <CurrentLocationContext.Provider value={currentTab.location}>
        <NotesContainer className={theme} />
      </CurrentLocationContext.Provider>
    </ApolloProvider>
  );
}
