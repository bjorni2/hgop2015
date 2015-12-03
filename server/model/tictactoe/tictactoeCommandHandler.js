'use strict';

function tictactoeCommandHandler(events){
  return {
    executeCommand: (cmd) => {
      if(cmd.command === 'createGame'){
        return [{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:"gameCreated",
          player:cmd.player,
          timeStamp:cmd.timeStamp
        }];  
      }
      else if(cmd.command === 'joinGame'){
        return [{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:"gameJoined",
          player:cmd.player,
          timeStamp:cmd.timeStamp
        }];
      }
    }
  };
};

module.exports = tictactoeCommandHandler;

