console.log("Service Worker Launched!", chrome);

import { initApolloClient } from "./initApolloClient";
import { initContextMenu } from "./initContextMenu";
import { initNotesPolling } from "./initNotesPolling";

initApolloClient()
  .then((client) => {
    initContextMenu(client);
    initNotesPolling(client);
  })
  .catch((error) =>
    console.error("Cannot initialize background API client", error)
  );
