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
    board:[['','',''],['','',''],['','','']],
    cellsLeft: 9
  };  

  events.forEach((e) => {
    if(e.event === 'movePlaced'){
      const side = (e.player === gameState.playerOne.name ? gameState.playerOne.side : gameState.playerTwo.side);
      gameState.board[e.x][e.y] = side;
      gameState.cellsLeft -= 1;
    }
    if(e.event === 'gameOver'){
      gameState.state = 'gameOver';
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
        if(gameState.state === 'gameOver' || !legalMove(gameState.board, cmd.x, cmd.y)){
          return [{
            gameId:cmd.gameId,
            commandId:cmd.commandId,
            event:'illegalMove',
            player:cmd.player,
            timeStamp:cmd.timeStamp
          }];
        }        
        
        // console.log(gameState.board[0]);
        // console.log(gameState.board[1]);
        // console.log(gameState.board[2]);
        
        const side = (cmd.player === gameState.playerOne.name ? gameState.playerOne.side : gameState.playerTwo.side);
        if(gameOver(gameState.board, cmd.x, cmd.y, side)){
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
        
        if(gameState.cellsLeft === 1){
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
            winner:'',
            timeStamp:cmd.timeStamp
          }];
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

function gameOver(board, x, y, side){
  if(!legalMove(board, x, y)){
    return false;
  }
  
  board[x][y] = side;

  // vertical win.
  if(board[x][0] === board[x][1] && board[x][0] === board[x][2]){
    return true;
  }
  // horizontal win.
  if(board[0][y] === board[1][y] && board[0][y] === board[2][y]){
    return true;
  }
  // diagonal wins.
  if(board[0][0] === board[1][1] && board[0][0] === board[2][2]){
    return true;
  }
  if(board[2][0] === board[1][1] && board[2][0] === board[0][2]){
    return true;
  }
  
  return false;
}

module.exports = tictactoeCommandHandler;

