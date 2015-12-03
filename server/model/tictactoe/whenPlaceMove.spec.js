'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('place move command', () => {
  let given, when, then;

  it('should place move in empty cell', () => {
    given = [{
      gameId:'1',
      commandId:'aB12',
      event:'gameCreated',
      player:'Jon',
      side:'X',
      timeStamp:'2015-12-04T00:00:03Z'
    },
    {
      gameId:'1',
      commandId:'1337',
      event:'gameJoined',
      player:'Bjorn',
      side:'O',
      timeStamp:'2015-12-04T00:00:30Z'
    }];

    when = {
      gameId:'1',
      commandId:'6667',
      command:'placeMove',
      player:'Jon',
      x:1,
      y:1,
      timeStamp:'2015-12-04T00:01:30Z'
    };

    then=[{
      gameId:'1',
      commandId:'6667',
      event:'movePlaced',
      player:'Jon',
      x:1,
      y:1,
      timeStamp:'2015-12-04T00:01:30Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

});
