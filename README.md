# bitmint-dashboard
My own UI to interact with my bot, which is built in python and running on a linux machine. The UI is built in React + Redux + Firebase with a Node + Express backend.

The UI can see turn on/off the bot, check out it's current active trades (stored on a realtime firebase database), and even force a sell using the ccxt unified exchange library (I'm only using bittrex currently though).

## Getting started
You'll Node.js installed first.

Clone and cd into the repo and then run the following to install the requirements:
```
npm install // installs server node modules
npm run client-install // installs react node modules

npm run dev // runs the dev server and front end ui concurrently
```

