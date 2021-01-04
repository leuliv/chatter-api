// Thread User

// Import Mongoose
var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    displayName: String,
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String,
    profilePicture: String,
    thumbnail: String
});
// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}