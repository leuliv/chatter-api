// threadController.js
// Import Thread model
Thread = require('../models/thread');
Message = require('../models/message');

// Handle index actions
exports.index = function (req, res) {
    Thread.get(function (err, threads) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Threads retrieved successfully",
            data: threads
        });
    });
};
// Handle create thread actions
exports.new = function (req, res) {
    var thread = new Thread();
    thread.title = req.body.title;
    thread.users = req.body.users;

    // save the thread and check for errors
    thread.save(function (err) {
        // if (err)
        //     res.json(err);

        var message = new Message();
        message.address = req.body.address;
        message.threadId = thread._id;
        message.body = req.body.body;
        message.save(function (err) {
            res.json({
                message: 'New message created!',
                newThread: thread,
                newMessage: message
            });

        });
    });
};
// Handle view thread info
exports.view = function (req, res) {
    Thread.findById(req.params.threadId, function (err, threads) {
        Message.find({ "threadId": req.params.threadId }, function (err, messages) {
            if (err)
                res.send(err);
            res.json({
                message: 'Thread details loading..',
                threads: threads,
                messages: messages
            });
        });
    });
};

// Handle update thread info
exports.update = function (req, res) {
    Thread.findById(req.params.threadId, function (err, thread) {
        if (err)
            res.send(err);

        thread.title = req.body.title;
        // save the thread and check for errors
        thread.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Thread Info updated',
                data: thread
            });
        });
    });
};

// Handle delete thread
exports.delete = function (req, res) {
    Thread.remove({
        _id: req.params.threadId
    }, function (err, thread) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Thread deleted'
        });
    });
};