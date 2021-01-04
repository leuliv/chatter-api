// userController.js

// Import User model
User = require('../models/user');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.displayName = req.body.displayName ? req.body.displayName : user.displayName;
    user.userName = req.body.userName;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.profilePicture = req.body.profilePicture;
    user.thumbnail = req.body.thumbnail;

    // save the contact and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    Thread.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
    Thread.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        user.displayName = req.body.displayName ? req.body.displayName : user.displayName;
        user.userName = req.body.userName;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.profilePicture = req.body.profilePicture;
        user.thumbnail = req.body.thumbnail;
        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};