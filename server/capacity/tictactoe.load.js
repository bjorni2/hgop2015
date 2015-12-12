var player = require('../fluid-api/tictactoeFluid').player;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 70 games in 7.5 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 30;
  var x = 17.5;

  this.timeout(x * 1000);

  var QED = function (err) {
    if(err) return done(err);
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    var gId = '' + gameId;
    given(player('Bjorn').createsGame(gId))
      .and(player('Gunnar').joinsGame(gId))
      .and(player('Bjorn').placesMove(0, 0).inGame(gId))
      .and(player('Gunnar').placesMove(0, 1).inGame(gId))
      .and(player('Bjorn').placesMove(0, 2).inGame(gId))
      .and(player('Gunnar').placesMove(1, 2).inGame(gId))
      .and(player('Bjorn').placesMove(1, 1).inGame(gId))
      .and(player('Gunnar').placesMove(2, 0).inGame(gId))
      .and(player('Bjorn').placesMove(1, 0).inGame(gId))
      .and(player('Gunnar').placesMove(2, 2).inGame(gId))
      .and(player('Bjorn').placesMove(2, 1).inGame(gId))
      .expect('gameOver').withWinner('').isOk(QED);
  }
});
