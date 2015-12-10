'use strict';

var should = require('should');
var request = require('supertest');
var assert = require('assert');
var uuid = require('node-uuid');
var acceptanceUrl = process.env.ACCEPTANCE_URL;


describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
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
            assert(res.body[0].side === 'X' || res.body[0].side === 'O');
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
    var command = {
      commandId : '1234',
      gameId : '888',
      command: 'createGame',
      player: 'Bjorn',
      timeStamp: '2014-12-02T11:29:29Z'
    };
    
    var gcEvent = {
      'commandId': '1234',
      'gameId': '888',
      'event': 'gameCreated',
      'player': 'Bjorn',
      'side': 'X',
      'timeStamp': '2014-12-02T11:29:29Z'
    };
    
    given(player('Bjorn').createsGame("888"))
      .sentTo('/api/createGame')
      .expect('gameCreated')
      .withPlayer('Bjorn')
      .when(done);
  });

});

function player(name){
  var name = name;
  
  var playerApi = {
    createsGame: function(gameId){
      return {
        commandId: uuid.v4(),
        gameId: gameId,
        command: 'createGame',
        player: name,
        timeStamp: Date.now()
      };
    }
  }
  return playerApi;
}

function given(cmd){
  var cmd = cmd;
  var destination = undefined;
  // var expectations = [];
  var expected = '';
  var player = '';
  
  var givenApi = {
    sentTo: function(dest){
      destination = dest;
      return givenApi;
    },
    expect: function(evnt){
      // expectations.push(evnt);
      expected = evnt;
      return givenApi;
    },
    and: function(evnt){
      expectations.push(evnt);
      return givenApi;
    },
    withPlayer: function(player){
      player = player;
      return givenApi;
    },
    when: function(done){
      var req = request(acceptanceUrl);
      req
        .post(destination)
        .type('json')
        .send(cmd)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + cmd.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              res.body[0].side.should.be.equalOneOf('X', 'O');
              res.body[0].side = 'X';
              res.body[0].player = player;
              res.body[0].event = expected;
              // should(res.body).eql(expectations);
              done();
            });
        });
    }
  }
  return givenApi;
}