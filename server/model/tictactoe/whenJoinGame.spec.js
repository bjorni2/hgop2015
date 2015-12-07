'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', () => {
  let given, when, then;

  it('should join existing game', () => {
    given = [{
      gameId:'1',
      commandId:'aB12',
      event:'gameCreated',
      player:'Jon',
      side:'O',
      timeStamp:'2015-12-04T00:00:03Z'
    }];
    when = {
      gameId:'1',
      commandId:'1337',
      command:'joinGame',
      player:'Bjorn',
      timeStamp:'2015-12-04T00:00:30Z'
    };
    then=[{
      gameId:'1',
      commandId:'1337',
      event:'gameJoined',
      player:'Bjorn',
      side:'X',
      timeStamp:'2015-12-04T00:00:30Z'
    }];
    
    let actual = tictactoeCommandHandler(given).executeCommand(when); 

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

  it('should not allow joining non-existing games', () => {
    given = [];
    when = {
      gameId:'33',
      commandId:'abcd',
      command:'joinGame',
      player:'Gunnar',
      timeStamp:'2015-11-04T00:00:30Z'
    };
    then=[{
      commandId:'abcd',
      event:'gameDidNotExist',
      player:'Gunnar',
      timeStamp:'2015-11-04T00:00:30Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
  
  it('should not allow more than two players in a game', () => {
    given = [{
      gameId:'3',
      commandId:'aB12',
      event:'gameCreated',
      player:'Jon',
      side:'O',
      timeStamp:'2015-12-04T00:00:03Z'
    },
    {
      gameId:'3',
      commandId:'1337',
      event:'gameJoined',
      player:'Bjorn',
      side:'X',
      timeStamp:'2015-12-04T00:00:30Z'
    }];
    when = {
      gameId:'3',
      commandId:'5454',
      command:'joinGame',
      player:'Gunnar',
      timeStamp:'2015-11-04T00:00:32Z'
    };
    then=[{
      gameId:'3',
      commandId:'5454',
      event:'gameWasFull',
      player:'Gunnar',
      timeStamp:'2015-11-04T00:00:32Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
});
