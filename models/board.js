var player=require('./snake');
var und = require('underscore/underscore');
var board=function(){
  var players=[];
  var apple={};



  function createNewPlayer(){
    players.push(new player.player());
  }


  function placeApple(){
    
    apple.x=random(0,700 );  
    apple.y=random(0,700 );  
  }
  
  if(players.length===0){
    createNewPlayer();
    placeApple();

  }
  setInterval(function(){placeApple();ws.emit('update',apple);ws.emit('update_snake');},5000);


  function update_snake(d){
    //und.findWhere(players,{id: d.id}).posArray=d.posArray;
  }


  return {
    players: players,
      apple: apple,
      update_snake: update_snake,
      createNewPlayer: createNewPlayer
  }
}



function random(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports={
  board: board,
}
