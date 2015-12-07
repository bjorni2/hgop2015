'use strict';

const tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('place move command', () => {
  let given, when, then;

  beforeEach(() => {
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
  });

  it('should place move in empty cell', () => {
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

  it('should not allow placing in occupied cell', () => {        
    given.push({
      gameId:'1',
      commandId:'blah',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:1,
      timeStamp:'2015-12-04T00:00:45Z'
    });
    
    when = {
      gameId:'1',
      commandId:'1234',
      command:'placeMove',
      player:'Bjorn',
      x:0,
      y:1,
      timeStamp:'2015-12-04T00:01:00Z'
    }
    
    then = [{
      gameId:'1',
      commandId:'1234',
      event:'illegalMove',
      player:'Bjorn',
      timeStamp:'2015-12-04T00:01:00Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });

 it('should not allow placing outside of board', () => {
   when = {
     gameId:'1',
     commandId:'1234',
     command:'placeMove',
     player:'Jon',
     x:3,
     y:0,
     timeStamp:'2015-12-04T00:01:01Z'
   }

   then = [{
     gameId:'1',
     commandId:'1234',
     event:'illegalMove',
     player:'Jon',
     timeStamp:'2015-12-04T00:01:01Z'
   }];

   let actual = tictactoeCommandHandler(given).executeCommand(when);

   JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
 });

  it('should make vertical win possible', () => {
    given.push({
      gameId:'1',
      commandId:'blah',
      event:'movePlaced',
      player:'Jon',
      x:1,
      y:1,
      timeStamp:'2015-12-04T00:00:45Z'
    },
    {
      gameId:'1',
      commandId:'4242',
      event:'movePlaced',
      player:'Bjorn',
      x:0,
      y:0,
      timeStamp:'2015-12-04T00:00:48Z'
    },
    {
      gameId:'1',
      commandId:'1111',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:1,
      timeStamp:'2015-12-04T00:00:52Z'
    },
    {
      gameId:'1',
      commandId:'7777',
      event:'movePlaced',
      player:'Bjorn',
      x:2,
      y:2,
      timeStamp:'2015-12-04T00:00:57Z'
    });

    when = {
      gameId:'1',
      commandId:'5544',
      command:'placeMove',
      player:'Jon',
      x:2,
      y:1,
      timeStamp:'2015-12-04T00:01:00Z'
    }

    then=[{
      gameId:'1',
      commandId:'5544',
      event:'movePlaced',
      player:'Jon',
      x:2,
      y:1,
      timeStamp:'2015-12-04T00:01:00Z'
    },
    {
      gameId:'1',
      commandId:'5544',
      event:'gameOver',
      winner:'Jon',
      timeStamp:'2015-12-04T00:01:00Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
  
  it('should make horizontal win possible', () => {
    given.push({
      gameId:'1',
      commandId:'blah',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:1,
      timeStamp:'2015-12-04T00:00:45Z'
    },
    {
      gameId:'1',
      commandId:'4242',
      event:'movePlaced',
      player:'Bjorn',
      x:1,
      y:0,
      timeStamp:'2015-12-04T00:00:48Z'
    },
    {
      gameId:'1',
      commandId:'1111',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:2,
      timeStamp:'2015-12-04T00:00:52Z'
    },
    {
      gameId:'1',
      commandId:'7777',
      event:'movePlaced',
      player:'Bjorn',
      x:2,
      y:2,
      timeStamp:'2015-12-04T00:00:57Z'
    });

    when = {
      gameId:'1',
      commandId:'5544',
      command:'placeMove',
      player:'Jon',
      x:0,
      y:0,
      timeStamp:'2015-12-04T00:01:00Z'
    }

    then=[{
      gameId:'1',
      commandId:'5544',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:0,
      timeStamp:'2015-12-04T00:01:00Z'
    },
    {
      gameId:'1',
      commandId:'5544',
      event:'gameOver',
      winner:'Jon',
      timeStamp:'2015-12-04T00:01:00Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
  
  it('should make diagonal win possible', () => {
    given.push({
      gameId:'1',
      commandId:'blah',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:0,
      timeStamp:'2015-12-04T00:00:45Z'
    },
    {
      gameId:'1',
      commandId:'4242',
      event:'movePlaced',
      player:'Bjorn',
      x:0,
      y:2,
      timeStamp:'2015-12-04T00:00:48Z'
    },
    {
      gameId:'1',
      commandId:'1111',
      event:'movePlaced',
      player:'Jon',
      x:2,
      y:2,
      timeStamp:'2015-12-04T00:00:52Z'
    },
    {
      gameId:'1',
      commandId:'7777',
      event:'movePlaced',
      player:'Bjorn',
      x:1,
      y:1,
      timeStamp:'2015-12-04T00:00:57Z'
    },
    {
      gameId:'1',
      commandId:'5544',
      event:'movePlaced',
      player:'Jon',
      x:1,
      y:2,
      timeStamp:'2015-12-04T00:01:00Z'
    });

    when = {
      gameId:'1',
      commandId:'8453',
      command:'placeMove',
      player:'Bjorn',
      x:2,
      y:0,
      timeStamp:'2015-12-04T00:01:33Z'
    }

    then=[{
      gameId:'1',
      commandId:'8453',
      event:'movePlaced',
      player:'Bjorn',
      x:2,
      y:0,
      timeStamp:'2015-12-04T00:01:33Z'
    },
    {
      gameId:'1',
      commandId:'8453',
      event:'gameOver',
      winner:'Bjorn',
      timeStamp:'2015-12-04T00:01:33Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
  
    it('should not allow moves when game is over.', () => {
    given.push({
      gameId:'1',
      commandId:'blah',
      event:'movePlaced',
      player:'Jon',
      x:0,
      y:0,
      timeStamp:'2015-12-04T00:00:45Z'
    },
    {
      gameId:'1',
      commandId:'4242',
      event:'movePlaced',
      player:'Bjorn',
      x:0,
      y:2,
      timeStamp:'2015-12-04T00:00:48Z'
    },
    {
      gameId:'1',
      commandId:'1111',
      event:'movePlaced',
      player:'Jon',
      x:2,
      y:2,
      timeStamp:'2015-12-04T00:00:52Z'
    },
    {
      gameId:'1',
      commandId:'7777',
      event:'movePlaced',
      player:'Bjorn',
      x:1,
      y:1,
      timeStamp:'2015-12-04T00:00:57Z'
    },
    {
      gameId:'1',
      commandId:'5544',
      event:'movePlaced',
      player:'Jon',
      x:1,
      y:2,
      timeStamp:'2015-12-04T00:01:00Z'
    },
    {
      gameId:'1',
      commandId:'8453',
      event:'movePlaced',
      player:'Bjorn',
      x:2,
      y:0,
      timeStamp:'2015-12-04T00:01:33Z'
    },
    {
      gameId:'1',
      commandId:'8453',
      event:'gameOver',
      winner:'Bjorn',
      timeStamp:'2015-12-04T00:01:33Z'
    });

    when = {
      gameId:'1',
      commandId:'L45T',
      command:'placeMove',
      player:'Jon',
      x:2,
      y:1,
      timeStamp:'2015-12-04T00:01:44Z'
    }

    then=[{
      gameId:'1',
      commandId:'L45T',
      event:'illegalMove',
      player:'Jon',
      timeStamp:'2015-12-04T00:01:44Z'
    }];

    let actual = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actual).should.be.exactly(JSON.stringify(then));
  });
});
