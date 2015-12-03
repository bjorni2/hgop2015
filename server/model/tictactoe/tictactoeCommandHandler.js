'use strict';

function tictactoeCommandHandler(events){
  const gameState = {
    gameId:events[0] && events[0].gameId,
    state:'active',
    playerOne:{
      name:events[0] && events[0].player,
      side:events[0] && events[0].side
    },
    playerTwo:{
      name:events[1] && events[1].player,
      side:events[1] && events[1].side
    },
    board:[['','',''],['','',''],['','','']]
  };  

  events.forEach((e) => {
    if(e.event === 'movePlaced'){
      const side = (e.player === gameState.playerOne.name ? gameState.playerOne.side : gameState.playerTwo.side);
      gameState.board[e.x][e.y] = side;
    }
  });

  return {
    executeCommand: (cmd) => {
      if(cmd.command === 'createGame'){
        return [{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:'gameCreated',
          player:cmd.player,
          side:pickRandomSide(),
          timeStamp:cmd.timeStamp
        }];  
      }
      else if(cmd.command === 'joinGame'){
        if(events[0] !== undefined){
          return [{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:'gameJoined',
          player:cmd.player,
          side:(events[0].side == 'X' ? 'O' : 'X'),
          timeStamp:cmd.timeStamp
          }];
        }
        return [{
          commandId:cmd.commandId,
          event:'gameDidNotExist',
          player:cmd.player,
          timeStamp:cmd.timeStamp
        }];
      }
      else if(cmd.command === 'placeMove'){
        if(gameState.board[cmd.x][cmd.y] !== ''){
          return[{
            gameId:cmd.gameId,
            commandId:cmd.commandId,
            event:'illegalMove',
            player:cmd.player,
            timeStamp:cmd.timeStamp
          }];
        }        

        return[{
          gameId:cmd.gameId,
          commandId:cmd.commandId,
          event:'movePlaced',
          player:cmd.player,
          x:cmd.x,
          y:cmd.y,
          timeStamp:cmd.timeStamp
        }];
      }
    }
  };
};

function pickRandomSide(){
  if(Math.random() < 0.5){
    return 'X';
  }
  return 'O';
}

module.exports = tictactoeCommandHandler;

