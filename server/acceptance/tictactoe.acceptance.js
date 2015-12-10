'use strict';

var should = require('should');
var request = require('supertest');
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
      .expect('gameOver').withWinner('Bjorn').isOk(done);
  }); 
});

function player(name){
  var name = name;
  var placeX = undefined;
  var placeY = undefined;
  
  var playerApi = {
    createsGame: function(gameId){
      return {
        cmd: {
          commandId: uuid.v4(),
          gameId: gameId,
          command: 'createGame',
          player: name,
          timeStamp: Date.now()
        },
        destination: '/api/createGame'
      };
    },
    joinsGame: function(gameId){
      return {
        cmd: {
          commandId: uuid.v4(),
          gameId: gameId,
          command: 'joinGame',
          player: name,
          timeStamp: Date.now()
        },
        destination: '/api/joinGame'
      };
    },
    placesMove: function(x, y){
      placeX = x;
      placeY = y;
      return playerApi;
    },
    inGame: function(gameId){
      return {
        cmd: {
          commandId: uuid.v4(),
          gameId: gameId,
          command: 'placeMove',
          player: name,
          x: placeX,
          y: placeY,
          timeStamp: Date.now()
        },
        destination: '/api/placeMove'
      };
    }
  }
  return playerApi;
}

function given(cmd){
  var cmds = [cmd];
  var expectations = [];
  var player = undefined;
  var winner = undefined;
  
  var givenApi = {
    expect: function(evnt){
      expectations.push(evnt);
      // expected = evnt;
      return givenApi;
    },
    and: function(cmd){
      cmds.push(cmd);
      return givenApi;
    },
    withPlayer: function(name){
      player = name;
      return givenApi;
    },
    withWinner: function(name){
      winner = name;
      return givenApi;
    },
    isOk: function(done){
      for(var i = 0; i < cmds.length; i++){
        var req = request(acceptanceUrl);
        req
          .post(cmds[i].destination)
          .type('json')
          .send(cmds[i].cmd)
          .end(function(err, res){
            if(err) return done(err);
          })
      }
      
      request(acceptanceUrl)
        .get('/api/gameHistory/' + cmds[0].cmd.gameId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          
          var last = res.body.length-1;
          res.body.should.be.instanceof(Array);
          res.body[last].event.should.be.eql(expectations[0]);
          // console.log(res.body[res.body.length-1]);
          if(expectations[0] === 'gameOver'){
            res.body[last].winner.should.be.eql(winner);
          }
          else{
            res.body[last].player.should.be.eql(player);
          }
          
          done();
        });
    }
  }
  return givenApi;
}