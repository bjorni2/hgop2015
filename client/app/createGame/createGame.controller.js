'use strict';

angular.module('tictactoeApp')
  .controller('CreateGameCtrl', function ($scope, $http, guid, $location) {
    $scope.createGame = function () {
      //var user = {'userName': $scope.userName, side: 'X'};

      var comId = guid();
      var gameId = guid();
      var createPost = $http.post('/api/createGame/', {
          'gameId': gameId,
          'commandId': comId,
          'command': 'createGame',
          'player': $scope.userName,
          'timeStamp': '2014-12-02T11:29:29'
        }
      );
      createPost.then(function (response) {
        $location.url('/tictactoe');
        $location.search('gameId', response.data[0].gameId);
        $location.search('gameSide', 'X');
      });

    };

  });
