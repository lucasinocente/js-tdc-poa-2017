module.exports = function(app) {
    
    var message = require('../controllers/messageController');

    app.route('/messages')
        .get(message.list)
        .post(message.create);
        
    app.route('/')
        .get(message.chat)
            
    app.route('/:room')
        .get(message.chat)

};