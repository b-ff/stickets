import { gql } from "@apollo/client";
import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { config } from "../config";

import CreateNoteMutation from "../common/queries/CreateNote.graphql";
import { NOTE_SCOPES } from "../common/constants/note-scopes";

const MENU_ITEM_ID_PREFIX = "stickets__add-note";

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
});

const CREATE_NOTE = gql`
  ${CreateNoteMutation}
`;

export default () => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${NOTE_SCOPES.GLOBAL}`,
      title: 'Add to "All" notes',
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${NOTE_SCOPES.SITE}`,
      title: "Add to site notes",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${NOTE_SCOPES.PAGE}`,
      title: "Add to page notes",
      contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener(
      ({ pageUrl: url, selectionText: note, menuItemId }) => {
        const scope = menuItemId.split(":").pop();

        client
          .mutate({
            mutation: CREATE_NOTE,
            variables: {
              scope,
              note,
              url,
            },
          })
          .then((result) => {
            console.log("Added note from context menu:", {
              url,
              note,
              scope,
              result,
            });
          })
          .catch(console.error);
      }
    );
  });
};
