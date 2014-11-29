var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(4567);

var routes = require('./routes/index').router;
var listeners = require('./routes/index').init_listeners;

http.listen();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/board', routes);


ws=null;
io.sockets.on('connection', function (socket) {
  ws=socket;
  listeners();
});



app.get('/snake.png', function(req, res) {
 var img = fs.readFileSync('public/images/rectangle-icon.png');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
});


module.exports = app;
