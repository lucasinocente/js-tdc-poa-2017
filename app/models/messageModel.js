var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    send_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    },
    content: {
        type: String
    }
});


module.exports = mongoose.model('Messages', MessageSchema);