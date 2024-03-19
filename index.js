// imports
const express = require('express');

// create the server and port
const app = express();
let port = process.env.PORT || 3000;
let path = 'http://localhost:';

// get a server request from any webpage
app.get('/', (req, res) => {
  // send message for response
  res.send('Successful response');
});

// server listening to port 3000
app.listen(port, () => {
  path += port;
  console.log(`Server running at ${path}`);
});
