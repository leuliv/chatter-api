var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/check', function (req, res) {
  res.json({
    status: 'Chatter API Its Working!',
    message: 'Welcome to Chatter!'
  });
});

router.get('/', function (req, res) {
  res.json({
    status: 'Users is accessible',
    message: 'Users'
  });
});

var usersController = require('../controllers/usersController');
// Contact routes
router.route('/users')
  .get(usersController.index)
  .post(usersController.new);
router.route('/users/:userId')
  .get(usersController.view)
  .patch(usersController.update)
  .put(usersController.update)
  .delete(usersController.delete);

var threadsController = require('../controllers/threadsController');
// Thread routes
router.route('/threads')
  .get(threadsController.index)
  .post(threadsController.new);
router.route('/threads/:threadId')
  .get(threadsController.view)
  .patch(threadsController.update)
  .put(threadsController.update)
  .delete(threadsController.delete);

var messagesController = require('../controllers/messagesController');
// Message routes
router.route('/messages')
  .get(messagesController.index)
  .post(messagesController.new);
router.route('/messages/:messageId')
  .get(messagesController.view)
  .patch(messagesController.update)
  .put(messagesController.update)
  .delete(messagesController.delete);


module.exports = router;
