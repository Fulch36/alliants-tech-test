// ALLIANTS API WEBSERVER - ROUTES - YOUTUBE

"use strict";

// **************************
// ********* Config *********
// **************************

// Imports
const routes = require('express').Router();
const axios = require('axios');
const { checkMissingParameters } = require('../../utilities/helpers');

// API instance creation
const apiHeaders = {
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip, deflate',
  'Connection': 'keep-alive',
  'User-Agent': 'Alliants Media Query (gzip)'
};
const apiTimeout = process.env.TIMEOUT || 5000;
const apiInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
  timeout: apiTimeout,
  headers: apiHeaders
});

// Errors and validation
const errorState = {
  success: false,
  errorMessage: 'Failed to get youtube data'
};
const paramList = [
  'searchTerm',
  'itemLimit'
];

// Request configuration
const defaultParams = {
  key: process.env.KEY,
  part: 'snippet',
  type: 'video',
  videoDuration: 'short',
  videoEmbeddable: 'true'
};

// **************************
// ***** End of section *****
// **************************

// **************************
// ********* Routes *********
// **************************

routes.route('/') // Get youtube search data
  .get(async function (req, res) {
    const clientErrors = checkMissingParameters(req.query, paramList); // Check that required params are in request

    if (clientErrors.length === 0) { // If no errors, params must be present
      try {
        const targetParams = Object.assign({ q: req.query.searchTerm, maxResults: req.query.itemLimit }, defaultParams); // Build target params

        let result = await apiInstance.get('', { params: targetParams }); // Issue request
        
        if (result.data.items) { // Verify that video data was fetched successfully
          res.status(200).send({ // Return result to client
            success: true,
            data: result.data.items
          });
        } else {
          console.error(errorState.errorMessage);
          res.status(500).send(errorState);
        }
      } catch (error) {
        console.error(error.response);
        res.status(500).send(errorState);
      }
    } else {
      res.status(400).send({
        success: false,
        errorMessage: errorState.errorMessage + ' - missing params: ' + clientErrors.join(', ')
      });
    }
  });

// **************************
// ***** End of section *****
// **************************

module.exports = routes;
