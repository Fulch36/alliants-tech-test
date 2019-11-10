// ALLIANTS API WEBSERVER - ROUTER

"use strict";

// **************************
// ********* Config *********
// **************************

const router = require('express').Router();
const youtubeRoutes = require('./routes/youtube');
const flickrRoutes = require('./routes/flickr');

// **************************
// ***** End of section *****
// **************************

// **************************
// ********* Router *********
// **************************

router.use('/youtube', youtubeRoutes);
router.use('/flickr', flickrRoutes);

// **************************
// ***** End of section *****
// **************************

module.exports = router;
