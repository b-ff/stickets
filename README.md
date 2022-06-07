![#Stickets icon](https://raw.githubusercontent.com/b-ff/stickets/master/static/icons/128.png)

# #Stickets

Chrome Extension that allows you to add a notes to any webpage you visit as well as share it with whoever you want

- Backend repo — https://github.com/rtf6x/stickets-api
- Chrome Web Store — _In Progress..._

# Currently under development.

### Getting started (for devs):

- Clone repo to your computer
- Run `npm install` or `yarn`
- To run application in development mode:
  - Run `npm run dev` if you planning to change both app and GraphQL files (may cause error `Cannot load module graphql.ts` :disappointed:)
  - **OR** Run `npm run codegen` if you only need to update GraphQL schema and types
  - **OR** Run `npm run dev:rollup` if you assume no GraphQL updates and just want to work with application code
- Go to [chrome://extensions/](chrome://extensions/)
- Make sure you have `Developer mode` enabled
- Hit `Load unpacked` button and select the folder on your computer where you have this project
- Enable extension
- Have fun!
