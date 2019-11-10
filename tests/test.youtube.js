// ALLIANTS API WEBSERVER - TEST - YOUTUBE

"use strict";

// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('YouTube', () => {
  describe('GET /youtube', () => {
    it('Should search for YouTube videos matching a specified query and limit the number of results', (done) => {
      const params = require('./params/youtube/get/search.json');

      // Very basic JSON schema check
      const members = [
        'kind',
        'etag',
        'id',
        'id.kind',
        'id.videoId',
        'snippet',
        'snippet.publishedAt',
        'snippet.channelId',
        'snippet.title',
        'snippet.description',
        'snippet.thumbnails',
        'snippet.thumbnails.default',
        'snippet.thumbnails.default.url',
        'snippet.thumbnails.default.width',
        'snippet.thumbnails.default.height',
        'snippet.thumbnails.medium',
        'snippet.thumbnails.medium.url',
        'snippet.thumbnails.medium.width',
        'snippet.thumbnails.medium.height',
        'snippet.thumbnails.high',
        'snippet.thumbnails.high.url',
        'snippet.thumbnails.high.width',
        'snippet.thumbnails.high.height',
        'snippet.channelTitle',
        'snippet.liveBroadcastContent'
      ];

      chai.request(app)
        .get('/api/youtube')
        .query(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.be.a('boolean');
          res.body.success.should.be.true;
          res.body.data.forEach(element => {
            members.forEach(member => {
              element.should.have.nested.property(member);
            });
          });
          done();
        });
    });
  });
});
