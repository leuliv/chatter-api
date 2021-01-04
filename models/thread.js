// Thread Model
//------------------
// Import Mongoose
var mongoose = require('mongoose');

// Setup Thread schema
var threadSchema = mongoose.Schema({
    title: String,
    users: {
        type: [String],
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Thread model
var Thread = module.exports = mongoose.model('threads', threadSchema);
module.exports.get = function (callback, limit) {
    Thread.find(callback).limit(limit);
}