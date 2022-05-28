console.log("Service Worker Launched!", chrome);

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  // const text = `0`;
  // const color = "#ff006f";
  // chrome.action.setBadgeText({ tabId, text });
  // chrome.action.setBadgeBackgroundColor({ tabId, color });
});
