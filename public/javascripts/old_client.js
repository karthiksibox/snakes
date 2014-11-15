var socket;

function paint_floor(ctx){
  //ctx.fillStyle = "#eee";
  //ctx.fillRect(0, 0, 1000, floor.height-300);
}
var $board;
function init_board(ctx,board){
  ctx.fillStyle = "#4B913F";
  console.log(board);
  board.players.forEach(function(d,i){
    player.x=d.x;
    player.width=d.height;
    drawRect(player,ctx)
  });
  $board=board;
}
function drawRect(player, context) {
  context.beginPath();

  if(player.direction==0){
    context.rect(player.x, player.y, player.width, player.height);
  }
  else{
      context.setTransform(0, 1,0.5,-0.5,1,30,10);
    context.rect(player.x/2, player.y, player.height, player.width);
  }

  context.fillStyle = '#8ED6FF';
  context.fill();
  context.lineWidth = player.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();

  socket.emit("move",player);
}


var height=window.innerHeight*0.80;
var width=window.innerWidth*0.75;
function init_game(){
  var floor=document.getElementById('floor');
  var ctx=floor.getContext('2d');
  floor.width=width;
  floor.height=height;

  socket=io("http://localhost:4567");
  socket.on('update',function(d){
    var floor=document.getElementById('floor');
    var ctx=floor.getContext('2d');

  })
  //socket.on('news', function (data) {
  //console.log(data);
  //});


  paint_floor(ctx);
  $.ajax({
    type: "GET",
    url: "/board",
    success: function(d){
      var ctx=floor.getContext('2d');
      init_board(ctx,d);
    }
  }
  );
}

var player = {
  x: 0,
  y: 75,
  width: 0,
  height: 20,
  borderWidth: 5,
  direction: 0,
};







snake = function(){

  var x=20;
  var y=30;
  var cell_height=10;
  var cell_width=10;
  var blocks=2;

  var floor=document.getElementById('floor');
  var context=floor.getContext('2d');


  
  function progress(){
    blocks=blocks+1;
    for(var i=0;i<=blocks;i++){
      draw(i);
    }
  }


  function draw(i){

  context.beginPath();
    context.rect(x+i, y, cell_height, cell_width);
    

  context.fillStyle = '#8ED6FF';
  context.fill();
  context.lineWidth = player.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
    
  }

  return {
    progress: progress
  }
}

document.addEventListener('keydown', function(event) {
  var key_code=event.keyCode;
  if(key_code==39 || 40 || 37 || 38){

    var floor=document.getElementById('floor');
    var ctx=floor.getContext('2d');
    player.x++;
    $board.players.forEach(function(d){
      if(player.width==0){
        player.width=player.height;
      }
      ctx.clearRect(0, 0, floor.width, floor.height);

      drawRect(player, ctx);
    });
    if(key_code==40){
      player.direction=3;
      player.width=player.width*2;
      drawRect(player, ctx);

    } 

  }

});
