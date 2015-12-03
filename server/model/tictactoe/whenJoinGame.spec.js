'use strict';

function tictactoeCommandHandler(events){
  return {
    executeCommand: (cmd) => {
      return [{
        gameId:cmd.gameId,
        commandId:cmd.commandId,
        event:"gameJoined",
        player:cmd.player,
        timeStamp:cmd.timeStamp
      }];
    }
  };
};

describe('join game command', () => {
  let given, when, then;

  it('should join existing game', () => {
    given = [{
      gameId:"1",
      commandId:"aB12",
      event:"gameCreated",
      player:"Jon",
      timeStamp:"2015-12-04T00:00:03Z"
    }];
    when = {
      gameId:"1",
      commandId:"1337",
      command:"joinGame",
      player:"Bjorn",
      timeStamp:"2015-12-04T00:00:30Z"
    };
    then=[{
      gameId:"1",
      commandId:"1337",
      event:"gameJoined",
      player:"Bjorn",
      timeStamp:"2015-12-04T00:00:30Z"
    }];
    
    let actual = tictactoeCommandHandler(given).executeCommand(when); 

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

});
