// ALLIANTS API WEBSERVER - ROUTES - FLICKR

"use strict";

// **************************
// ********* Config *********
// **************************

// Imports
const routes = require('express').Router();
const axios = require('axios');
const { getRandomSelection, checkMissingParameters } = require('../../utilities/helpers');

// API instance creation
const apiHeaders = {
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip, deflate',
  'Connection': 'keep-alive',
  'User-Agent': 'Alliants Media Query (gzip)'
};
const apiTimeout = process.env.TIMEOUT || 5000;
const apiInstance = axios.create({
  baseURL: 'https://www.flickr.com/services/feeds/photos_public.gne',
  timeout: apiTimeout,
  headers: apiHeaders
});

// Errors and validation
const errorState = {
  success: false,
  errorMessage: 'Failed to get photo feed'
};
const paramList = [
  'searchTerm',
  'itemLimit'
];

// Request configuration
const defaultParams = {
  format: 'json',
  nojsoncallback: 1
};

// **************************
// ***** End of section *****
// **************************

// **************************
// ********* Routes *********
// **************************

routes.route('/') // Get public feed
  .get(async function (req, res) {
    const clientErrors = checkMissingParameters(req.query, paramList); // Check that required params are in request

    if (clientErrors.length === 0) { // If no errors, params must be present
      try {
        const targetParams = Object.assign({ tags: req.query.searchTerm }, defaultParams); // Build target params

        let result = await apiInstance.get('/', { params: targetParams }); // Issue request
        
        if (result.data.items) { // Verify that search data was fetched successfully
          const imageFeed = result.data.items;

          if (imageFeed.length <= req.query.itemLimit) { // If 3 or fewer images are returned for a search, no need to randomise results
            res.status(200).send({ // Return result to client
              success: true,
              data: imageFeed
            });
          } else {
            res.status(200).send({ // Return random selection to client
              success: true,
              data: getRandomSelection(imageFeed, req.query.itemLimit)
            });
          }
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
