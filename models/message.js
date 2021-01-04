// Message Model
//------------------
// Import Mongoose
var mongoose = require('mongoose');

// Setup Message schema
var messageSchema = mongoose.Schema({
    threadId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export Thread model
var Message = module.exports = mongoose.model('messages', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}