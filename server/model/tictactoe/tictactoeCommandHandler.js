'use strict';

function tictactoeCommandHandler(events){
  const gameState = {
    gameId:events[0] && events[0].gameId,
    state:'active',
    winner:'',
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
          side:(events[0].side === 'X' ? 'O' : 'X'),
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
        console.log(gameState.board[0]);
        console.log(gameState.board[1]);
        console.log(gameState.board[2]);
        if(!legalMove(gameState.board, cmd.x, cmd.y)){
          return [{
            gameId:cmd.gameId,
            commandId:cmd.commandId,
            event:'illegalMove',
            player:cmd.player,
            timeStamp:cmd.timeStamp
          }];
        }        
        
        const side = (cmd.player === gameState.playerOne.name ? gameState.playerOne.side : gameState.playerTwo.side);
        if(gameState.board[0][cmd.y] === side || cmd.x === 0){
          if(gameState.board[1][cmd.y] === side || cmd.x === 1){
            if(gameState.board[2][cmd.y] === side || cmd.x === 2){
              return [{
                gameId:cmd.gameId,
                commandId:cmd.commandId,
                event:'movePlaced',
                player:cmd.player,
                x:cmd.x,
                y:cmd.y,
                timeStamp:cmd.timeStamp
              },
              {
                gameId:cmd.gameId,
                commandId:cmd.commandId,
                event:'gameOver',
                winner:cmd.player,
                timeStamp:cmd.timeStamp
              }];
            }
          }
        }
        if(gameState.board[cmd.x][0] === side || cmd.y === 0){
          if(gameState.board[cmd.x][1] === side || cmd.y === 1){
            if(gameState.board[cmd.x][2] === side || cmd.y === 2){
              return [{ 
                gameId:cmd.gameId,
                commandId:cmd.commandId,
                event:'movePlaced',
                player:cmd.player,
                x:cmd.x,
                y:cmd.y,
                timeStamp:cmd.timeStamp
              },
              {
                gameId:cmd.gameId,
                commandId:cmd.commandId,
                event:'gameOver',
                winner:cmd.player,
                timeStamp:cmd.timeStamp
              }];
            }
          }
        }

        return [{
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
}

function pickRandomSide(){
  if(Math.random() < 0.5){
    return 'X';
  }
  return 'O';
}

function legalMove(board, x, y){
  if(x < 0 || x > 2 || y < 0 || y > 2){
    return false; 
  }
  if(board[x][y] !== ''){
    return false;
  }
  return true;
}

module.exports = tictactoeCommandHandler;

