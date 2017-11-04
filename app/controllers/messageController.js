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

    Message.find({}, function(err, messages) {
        if (err)
            res.send(err);
        res.render('pages/chat', {messages: messages});
    });

}; 
    

exports.create = function(req, res) {

    var newMessage = new Message(req.body);

    newMessage.save(function(err, message) {
        if (err) {
            res.send(err);
        } else {
            io.emit('message', message);
            res.json(message);
        }
    });

};