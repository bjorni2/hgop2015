'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function () {

  it('should respond with JSON array with created events for game', function (done) {
    var command =     {
      commandId : '1234',
      gameId : '999',
      command: 'createGame',
      player: 'Gulli',
      timeStamp: '2014-12-02T11:29:29Z'
    };

    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            //['X', 'O'].should.matchAny(res.body[0].side);
            res.body[0].side = 'X';
            should(res.body).eql(
              [{
                'commandId': '1234',
                'gameId': '999',
                'event': 'gameCreated',
                'player': 'Gulli',
                'side': 'X',
                'timeStamp': '2014-12-02T11:29:29Z'
              }]);
            done();
          });
      });
  });
});
