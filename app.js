var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
globals=function(){};
  globals=new globals();
(function() {
  globals.directions={}
  globals.directions['left']=0;
  globals.directions['right']=1;
  globals.directions['up']=2;
  globals.directions['down']=3;

}());

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(4567);
http.listen();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/board', routes);

app.get('/snake.png', function(req, res) {
 var img = fs.readFileSync('public/images/rectangle-icon.png');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



io.on('connection', function(socket){
  console.log('a user connected');
});



module.exports = app;


//var io = require('socket.io').listen(server);
//server.listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
//});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('move', function (data) {
    console.log(data);
    socket.emit('update',data);
  });
});

