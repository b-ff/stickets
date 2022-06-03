import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import GetAllNotes from '../common/graphql/queries/GetAllNotes.graphql';
import { NoteScope } from '../common/graphql/__generated__/graphql';
import { groupNotesByScope } from '../common/utils';
import { config } from '../config';

const GET_ALL_NOTES = gql`
  ${GetAllNotes}
`;

const drawBadgeCount = (tabId: number, count = 0): void => {
  const color = '#ff006f';
  const text = count >= 1000 ? '999+' : `${count}`;

  chrome.action.setBadgeBackgroundColor({ tabId, color });
  chrome.action.setBadgeText({ tabId, text });
};

export function initNotesPolling(client: ApolloClient<NormalizedCacheObject>): void {
  let timeoutId: NodeJS.Timeout;

  const makePollRequest = (location: URL, tabId: number) => {
    client
      .query({
        query: GET_ALL_NOTES,
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => {
        const { allNotes: notes } = data;

        if (notes) {
          const groupedNotes = groupNotesByScope(notes, location);
          const count = groupedNotes[NoteScope.Page].length + groupedNotes[NoteScope.Site].length;

          chrome.storage.local.set({ notes });

          drawBadgeCount(tabId, count);

          console.log('Loaded all user notes:', location.origin, notes);
        }

        timeoutId = setTimeout(() => makePollRequest(location, tabId), config.api.pollingIntervalMS);
      })
      .catch(console.error);
  };

  chrome.tabs.onActivated.addListener(({ tabId }: chrome.tabs.TabActiveInfo) => {
    chrome.tabs.get(tabId, ({ url, pendingUrl }: chrome.tabs.Tab) => {
      clearTimeout(timeoutId);
      makePollRequest(new URL((url || pendingUrl) as string), tabId);
    });
  });

  chrome.runtime.onSuspend.addListener(() => {
    clearTimeout(timeoutId);
  });
}
