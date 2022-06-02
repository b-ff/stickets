console.log("Service Worker Launched!", chrome);

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { initApolloClient } from "./initApolloClient";
import { initContextMenu } from "./initContextMenu";
import { initNotesPolling } from "./initNotesPolling";

initApolloClient()
  .then((client: ApolloClient<NormalizedCacheObject>): void => {
    initContextMenu(client);
    initNotesPolling(client);
  })
  .catch((error: Error) =>
    console.error("Cannot initialize background API client", error)
  );
