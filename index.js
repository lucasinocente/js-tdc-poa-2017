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
mongoose.connect(process.env.MONGOURL || 'mongodb://127.0.0.1:27017/chat-db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

io.sockets.on('connection', function(socket) {
  socket.on('room', function(room) {
      socket.join(room);
  });
});

var routes = require('./app/routes/messageRoutes');
routes(app);
  
http.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});