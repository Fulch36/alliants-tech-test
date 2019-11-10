// ALLIANTS API WEBSERVER - INDEX

"use strict";

// **************************
// ********* Config *********
// **************************

const router = require('./api/router');
const express = require('express');
const app = express();

// **************************
// ***** End of section *****
// **************************

// **************************
// ****** Environment *******
// ******* Variables ********
// **************************

// NOT NEEDED UNLESS REFACTORING PROCESS ENV BEHAVIOUR

/*
const envPath =__dirname + '/.env';

// Read environment vars file if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: envPath });
}
*/

// **************************
// ***** End of section *****
// **************************

// Init
if (process.env.KEY) { // Check that key is present, application will not function without it
  // Env vars
  const port = process.env.PORT || 3000; // Read port

  // Express middleware
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(express.static('public')); // Host static assets
  app.use('/api', router); // Attach router

  // Express start
  app.listen(port, () => console.log(`Alliants API Webserver listening on port ${port}!`)); // Initialise app

  module.exports = app;
} else {
  console.error('No key found in environment variables');
  process.exitCode = 1;
}
