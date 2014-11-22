var player=require('./snake');
var board=function(){
  var players=[];
var apple={};


  function createNewPlayer(){
    players.push(new player.player());
  }


  function placeApple(){
     apple.x=random(0,players[0].posArray[0].x + 100 );  
     apple.y=random(0,players[0].posArray[0].y + 100 );  
}
  

  if(players.length===0){
    createNewPlayer();
    placeApple();
    
  }
   setInterval(function(){placeApple();ws.emit('update',apple);},1000);


  return {
    players: players,
    apple: apple
  }
}

function random(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports={
  board: board,
}
