snake=function(socket){

  var previousPosArray;
  var posArray = [];
  var head=Math.floor((Math.random()*10)+3)+10;
  posArray.push({'x': head,'y': 3});
  posArray.push({'x': head-5,'y': 3});
  posArray.push({'x': head-14,'y': 3});
  posArray.push({'x': head-20,'y': 3});
  
 
  var direction = 'right';
  var nextDirection = direction;

  return {
    id: 1,
    posArray: posArray,

  }
}

module.exports={
  player: snake
}

