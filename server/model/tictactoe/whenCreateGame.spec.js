'use strict';

function tictactoeCommandHandler(events){
  return {
    executeCommand: (cmd) => {
      return [{
        gameId:cmd.gameId,
        commandId:cmd.commandId,
        event:"gameCreated",
        player:cmd.player,
        timeStamp:cmd.timeStamp
      }];
    }
  };
};

describe('create game command', () => {
  let given, when, then;

  it('should create game', () => {
    given = [];
    when = {
      gameId:"1",
      commandId:"12AB",
      command:"createGame",
      player:"Bjorn",
      timeStamp:"2015-12-03T15:18:30Z"
    };
    then=[{
      gameId:"1",
      commandId:"12AB",
      event:"gameCreated",
      player:"Bjorn",
      timeStamp:"2015-12-03T15:18:30Z"
    }];
    
    let actual = tictactoeCommandHandler(given).executeCommand(when); 

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with different properties', () => {
    given = [];
    when = {
      gameId:"70",
      commandId:"1234",
      command:"createGame",
      player:"Ingi",
      timeStamp:"2015-12-03T16:18:30Z" 
    };
    then=[{
      gameId:"70",
      commandId:"1234",
      event:"gameCreated",
      player:"Ingi",
      timeStamp:"2015-12-03T16:18:30Z"
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
});
