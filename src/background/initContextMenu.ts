import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import CreateNoteMutation from "../common/queries/CreateNote.graphql";
import { Scope } from "../common/enums/Scope";

const MENU_ITEM_ID_PREFIX = "stickets__add-note";

const CREATE_NOTE = gql`
  ${CreateNoteMutation}
`;

export function initContextMenu(client: ApolloClient<NormalizedCacheObject>) {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${Scope.Global}`,
      title: 'Add to "All" notes',
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${Scope.Site}`,
      title: "Add to site notes",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: `${MENU_ITEM_ID_PREFIX}:${Scope.Page}`,
      title: "Add to page notes",
      contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener(
      ({
        pageUrl: url,
        selectionText: note,
        menuItemId,
      }: chrome.contextMenus.OnClickData) => {
        const scope = `${menuItemId}`.split(":").pop();

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
}
