'use strict';

function tictactoeCommandHandler(events){
  return {
    executeCommand: function (cmd) {
      return [{
        gameId:"1",
        commandId:"12AB",
        event:"gameCreated",
        player:"Bjorn",
        timeStamp:"2015-12-03T15:18:30Z"
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
});
