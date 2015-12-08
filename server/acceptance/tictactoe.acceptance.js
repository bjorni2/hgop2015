'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;


describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command =     {
      commandId : '1234',
      gameId : '999',
      command: 'createGame',
      player: 'Bjorn',
      timeStamp: '2014-12-02T11:29:29Z'
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body[0].side = 'X';
            should(res.body).eql(
              [{
                'commandId': '1234',
                'gameId': '999',
                'event': 'gameCreated',
                'player': 'Bjorn',
                'side': 'X',
                'timeStamp': '2014-12-02T11:29:29Z'
              }]);
            done();
          });
      });
  });


   it('Should execute fluid API test', function (done) {
     /*
     given(user('YourUser').createsGame('TheFirstGame'))
     .expect('GameCreated').withName('TheFirstGame').isOk(done);
      */
     done();
   });

});