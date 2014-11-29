var express = require('express');
var router = express.Router();
var board=require('../models/board');
//function init_board(){
 //board=board.board();

//}

router.get('/', function(req, res) {
  res.render('index', { title: 'Snake'});
});

var board=board.board();
router.get('/board', function(req, res) {
  
  res.send(board);
});


function all_socket_init(){
  ws.on('update_snake',function(d){
    board.update_snake(d);
    ws.emit('move_players',board.players)
  })
  
}

module.exports = {router: router,
board: board,
init_listeners: all_socket_init}
