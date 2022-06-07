const drawBadgeCount = (tabId: number, count: number): void => {
  const color = '#ff006f';
  const text = (count && (count >= 1000 ? '999+' : `${count}`)) || '';

  chrome.action.setBadgeBackgroundColor({ tabId, color });
  chrome.action.setBadgeText({ tabId, text });
};

export function initBadge() {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    const changedKeys = Object.keys(changes);
    const keysToWatch = ['siteNotesCount', 'pageNotesCount'];
    const areaToWatch = 'local';

    if (areaName === areaToWatch && !!keysToWatch.find((k) => changedKeys.includes(k))) {
      Promise.all([
        chrome.tabs.query({ active: true, lastFocusedWindow: true }),
        chrome.storage.local.get('siteNotesCount'),
        chrome.storage.local.get('pageNotesCount'),
      ]).then(([[tab], { siteNotesCount }, { pageNotesCount }]) => {
        siteNotesCount = parseInt(siteNotesCount);
        pageNotesCount = parseInt(pageNotesCount);

        if (tab.id && (siteNotesCount || pageNotesCount)) {
          drawBadgeCount(tab.id, siteNotesCount + pageNotesCount);
        }
      });
    }
  });
}
