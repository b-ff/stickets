import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetAllNotesDocument, NoteScope } from '../common/graphql/__generated__/graphql';
import { groupNotesByScope } from '../common/utils';
import { config } from '../config';

export function initNotesPolling(client: ApolloClient<NormalizedCacheObject>): void {
  let timeoutId: NodeJS.Timeout;

  const makePollRequest = (location: URL, tabId: number) => {
    client
      .query({
        query: GetAllNotesDocument,
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => {
        const { allNotes: notes } = data;

        if (notes) {
          const groupedNotes = groupNotesByScope(notes, location);
          const count =
            groupedNotes[NoteScope.Page].length + groupedNotes[NoteScope.Site].length;

          chrome.storage.local.set({
            notes,
            totalNotesCount: notes.length,
            globalNotesCount: groupedNotes[NoteScope.Global].length,
            siteNotesCount: groupedNotes[NoteScope.Site].length,
            pageNotesCount: groupedNotes[NoteScope.Page].length,
          });

          console.log('Loaded all user notes:', location.origin, notes);
        }

        timeoutId = setTimeout(
          () => makePollRequest(location, tabId),
          config.api.pollingIntervalMS,
        );
      })
      .catch(console.error);
  };

  chrome.tabs.onActivated.addListener(({ tabId }: chrome.tabs.TabActiveInfo) => {
    chrome.tabs.get(tabId, ({ url, pendingUrl }: chrome.tabs.Tab) => {
      clearTimeout(timeoutId);
      makePollRequest(new URL((url || pendingUrl) as string), tabId);
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && tab.status === 'complete') {
      clearTimeout(timeoutId);
      makePollRequest(new URL((tab.url || tab.pendingUrl) as string), tabId);
    }
  });

  chrome.runtime.onSuspend.addListener(() => {
    clearTimeout(timeoutId);
  });
}
