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
        if(events[0] !== undefined){
          return [{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:"gameJoined",
          player:cmd.player,
          timeStamp:cmd.timeStamp
          }];
        }
        return [{
          commandId:cmd.commandId,
          event:"gameDidNotExist",
          player:cmd.player,
          timeStamp:cmd.timeStamp
        }];
      }
      else if(cmd.command === 'placeMove'){
        return[{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:"movePlaced",
          player:cmd.player,
          x:cmd.x,
          y:cmd.y,
          timeStamp:cmd.timeStamp
        }];
      }
    }
  };
};

module.exports = tictactoeCommandHandler;

