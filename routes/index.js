var express = require('express');
var router = express.Router();
next_available_id=1;
function get_new_id(){
  return next_available_id++;
}
function get_new_id(){
  this.id++;
  return next_available_id++;
}

var Player=function(){
  this.id=get_new_id();
  this.name="anonymous";
  this.height=30;
  this.x=0;
  this.y=0;
  this.direction=globals.directions['right'];
}


var Board=function(player,board){
  if(board==undefined){
    this.players=[]
      this.players.push(player)
      return this;
  }
  //if($max_length==6){
    //return board;
  //}
  board.players.push(player)
  return board;
}


var player=new Player;
var boards=[];
boards[0]=new Board(player);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Snake'});
});

router.get('/board', function(req, res) {
  var player=new Player();
  boards[0]=new Board(player,boards[0]);
  player=new Player();
  boards[0]=new Board(player,boards[0]);
  boards[0].players[1].x=30;
  player=new Player();
  boards[0]=new Board(player,boards[0]);
  boards[0].players[2].x=90;
  
  var resp=boards[0];  
  res.send(resp);
});


//router.get('/socket.io', function(req, res) {
  //if(Object.keys(req.body).length>0){
  //console.log(req.body)
  //}
  //res.send(boards[0]);
//});


router.get('/initialize_snake.json', function(req, res) {
  var resp={}
  var player=new Player();
  boards[0]=new Board(Player,boards[0]);
  var player=new Player();
  boards[0]=new Board(Player,boards[0]);
  boards[0].players[1].x=20;
  resp=boards[0];
  resp.height=req.query.height+5;
  res.send(resp);
});

module.exports = router;
