// messageController.js
// Import Message model
Message = require('../models/message');
var messageController = require('./messagesController');
// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, messages) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Messages retrieved successfully",
            data: messages
        });
    });
};
// Handle create Message actions

exports.new = function (req, res) {
    var message = new Message();
    message.address = req.body.address;
    message.threadId = req.body.threadId;
    message.body = req.body.body;

    // save the Message and check for errors
    message.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'Message Sent!',
            data: message
        });
    });
};
// Handle view Message info
exports.view = function (req, res) {
    Message.findById(req.params.messageId, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: message
        });
    });
};
// Handle update message info
exports.update = function (req, res) {
    Message.findById(req.params.messageId, function (err, message) {
        if (err)
            res.send(err);
        message.body = req.body.body;
        message.read = req.body.read;
        // save the message and check for errors
        message.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Message Info updated',
                data: message
            });
        });
    });
};
// Handle delete message
exports.delete = function (req, res) {
    Message.remove({
        _id: req.params.messageId
    }, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Message deleted'
        });
    });
};