console.log("Service Worker Launched!", chrome);

import contextMenu from "./contextMenu";

contextMenu();

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const color = "#ff006f";
  chrome.action.setBadgeBackgroundColor({ tabId, color });

  // const text = `0`;
  // chrome.action.setBadgeText({ tabId, text });
});
