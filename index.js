'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.get('/callback', (req, res) => res.end(`I'm listening. Please access with POST.`));

// webhook callback
app.post('/callback', (req, res) => res.status(200).end());

// {
//   res.end(`I'm listening. Please access with POST.`)
//   if (req.body.destination) {
//     console.log("Destination User ID: " + req.body.destination);
//   }

//   // req.body.events should be an array of events
//   if (!Array.isArray(req.body.events)) {
//     return res.status(200).end();
//   }

//   // handle events separately
//   Promise.all(req.body.events.map(handleEvent))
//     .then(() => res.end())
//     .catch((err) => {
//       console.error(err);
//       console.log('err')
//       res.status(200).end();
//     });
// });

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
