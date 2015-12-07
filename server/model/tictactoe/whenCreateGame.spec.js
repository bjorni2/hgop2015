'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');
const assert = require('assert');

describe('create game command', () => {
  let given, when, then;

  it('should create game', () => {
    given = [];
    when = {
      gameId:'1',
      commandId:'12AB',
      command:'createGame',
      player:'Bjorn',
      timeStamp:'2015-12-03T15:18:30Z'
    };
    then=[{
      gameId:'1',
      commandId:'12AB',
      event:'gameCreated',
      player:'Bjorn',
      side:'X',
      timeStamp:'2015-12-03T15:18:30Z'
    }];
    
    let actual = tictactoeCommandHandler(given).executeCommand(when); 
    
    assert(actual[0].side === 'X' || actual[0].side === 'O');
    actual[0].side = 'X';
    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with different properties', () => {
    given = [];
    when = {
      gameId:'70',
      commandId:'1234',
      command:'createGame',
      player:'Ingi',
      timeStamp:'2015-12-03T16:18:30Z' 
    };
    then=[{
      gameId:'70',
      commandId:'1234',
      event:'gameCreated',
      player:'Ingi',
      side:'X',
      timeStamp:'2015-12-03T16:18:30Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);
    
    assert(actual[0].side === 'X' || actual[0].side === 'O');
    actual[0].side = 'X';
    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
});
