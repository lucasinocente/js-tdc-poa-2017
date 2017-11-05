var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
io = require('socket.io')(http);
var mongoose   = require('mongoose');
var Message = require('./app/models/messageModel');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL || 'mongodb://js-2017:js123@ds243285.mlab.com:43285/js-2017');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();

}

io.sockets.on('connection', function(socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
      socket.join(room);
      console.log('room:', room)
  });
});

  
app.use(allowCrossDomain);

var routes = require('./app/routes/messageRoutes');
routes(app);
  
http.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});