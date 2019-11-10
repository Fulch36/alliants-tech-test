// ALLIANTS API WEBSERVER - TEST - FLICKR

"use strict";

// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Flickr', () => {
  describe('GET /flickr', () => {
    it('Should search for Flickr images matching a specified query and limit the number of results', (done) => {
      const params = require('./params/flickr/get/search.json');

      // Very basic JSON schema check
      const members = [
        'title',
        'link',
        'media',
        'date_taken',
        'description',
        'published',
        'author',
        'author_id',
        'tags',
        'media.m'
      ];

      chai.request(app)
        .get('/api/flickr')
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
