'use strict';

var should = require('should');
var request = require('supertest');
var uuid = require('node-uuid');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var player = require('../fluid-api/tictactoeFluid').player;
var given = require('../fluid-api/tictactoeFluid').given;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
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
    given(player('Bjorn').createsGame('888'))
      .and(player('Gunnar').joinsGame('888'))
      .and(player('Bjorn').placesMove(0, 0).inGame('888'))
      .and(player('Gunnar').placesMove(0, 1).inGame('888'))
      .and(player('Bjorn').placesMove(0, 2).inGame('888'))
      .and(player('Gunnar').placesMove(1, 2).inGame('888'))
      .and(player('Bjorn').placesMove(1, 1).inGame('888'))
      .and(player('Gunnar').placesMove(2, 0).inGame('888'))
      .and(player('Bjorn').placesMove(1, 0).inGame('888'))
      .and(player('Gunnar').placesMove(2, 2).inGame('888'))
      .and(player('Bjorn').placesMove(2, 1).inGame('888'))
      .expect('gameOver').withWinner('').isOk(done);
  }); 
});
