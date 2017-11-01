var mongoose = require('mongoose');
var Message = mongoose.model('Messages');


exports.list = function(req, res) {

    Message.find({}, function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });

}; 


exports.create = function(req, res) {

    var newMessage = new Message(req.body);

    newMessage.save(function(err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });

};