var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Just Sport' });
});

router.get('/account', function(req, res, next) {
  res.render('login', { title: 'Just Sport' });
});

router.get('/account/profile', function(req, res, next) {
  res.render('profile', { title: 'Just Sport' });
});

router.get('/backoffice', function(req, res, next) {
  res.render('backoffice', { title: 'Just Sport' });
});

module.exports = router;
