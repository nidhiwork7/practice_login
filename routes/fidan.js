var express = require('express');
var router = express.Router();
var account_controller = require('../controllers/account_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', account_controller.get_signup);
router.get('/login', account_controller.get_login);
router.get('/logout', account_controller.get_logout);

//POST request for Login.
router.post('/signup', account_controller.post_signup);
router.post('/login', account_controller.post_login);

module.exports = router;
