var mongoose = require('mongoose');
var Message = mongoose.model('Messages');


exports.list = function(req, res) {
    
    Message.find({}, function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });

}; 


exports.chat = function(req, res) {

    var room = req.params.room

    Message.find({ 'room': room }, function(err, messages) {
        if (err)
            res.send(err);
        res.render('pages/chat', {messages: messages});
    });

}; 
    

exports.create = function(req, res) {

    var newMessage = new Message(req.body);
    var room = '/' + req.body.room;

    console.log('room:', room)

    newMessage.save(function(err, message) {
        if (err) {
            res.send(err);
        } else {
            io.in(room).emit('message', message);
            res.json(message);
        }
    });

};