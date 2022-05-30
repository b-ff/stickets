console.log("Service Worker Launched!", chrome);

import { initApolloClient } from "./initApolloClient";
import { initContextMenu } from "./initContextMenu";

initApolloClient()
  .then((client) => {
    initContextMenu(client);
  })
  .catch((error) =>
    console.error("Cannot initialize background API client", error)
  );

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const color = "#ff006f";
  chrome.action.setBadgeBackgroundColor({ tabId, color });

  // const text = `0`;
  // chrome.action.setBadgeText({ tabId, text });
});
