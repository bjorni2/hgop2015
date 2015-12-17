'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          var handlers = {
            'gameCreated': function (event, gameState) {
              gameState.created = true;
              //gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = event.player;
            },
            'gameJoined': function (event, gameState) {
              gameState.joiningUser = event.player;
            },
            'movePlaced': function (event, gameState) {
              var x = event.x, y = event.y;
              gameState.board[x][y] = event.side;
              gameState.nextTurn = event.side === 'X' ? 'O' : 'X';
            },
            'gameOver': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner = event.winner;
              if(event.winner === ''){
                gameState.gameDraw = true;
              }
            },
            'GameDraw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event]){
              handlers[ev.event](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
