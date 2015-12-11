'use strict';

var should = require('should');
var request = require('supertest');
var uuid = require('node-uuid');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

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

      function sendCmd(i){
        if(i < cmds.length){
          var req = request(acceptanceUrl);
          req
            .post(cmds[i].destination)
            .type('json')
            .send(cmds[i].cmd)
            .end(function(err, res){
              if(err){
                return done(err);
              }
              else if((i+1) === cmds.length){
                request(acceptanceUrl)
                  .get('/api/gameHistory/' + cmds[0].cmd.gameId)
                  .expect(200)
                  .expect('Content-Type', /json/)
                  .end(function(err, res){
                    if(err) return done(err);
                    
                    // TODO: Handle more than one return event(and stop using /api/gameHistory)
                    var last = res.body.length-1;
                    res.body.should.be.instanceof(Array);
                    res.body[last].event.should.be.eql(expectations[0]);
                    if(expectations[0] === 'gameOver'){
                      res.body[last].winner.should.be.eql(winner);
                    }
                    else{
                      res.body[last].player.should.be.eql(player);
                    }
                    
                    done();
                  });
              }
              else{
                sendCmd(i+1);
              }
            })
        }
      }
      sendCmd(0);
    }
  }
  return givenApi;
}

module.exports = {
  given: given,
  player: player
}
