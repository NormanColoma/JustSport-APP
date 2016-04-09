var express = require('express');
var router = express.Router();
var middleware = require('../app/middlewares/redirect');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Just Sport' });
});

router.get('/login', middleware.isLoggedIn, function(req, res, next) {
  res.render('login', { title: 'Just Sport' });
});

router.post('/token/:token', function(req, res, next) {
  var url = req.protocol + "://" + req.hostname + global.port + "/";
  localStorage.setItem('token', req.params.token);
  res.sendStatus(200);
});


router.get('/token', function(req,res,next){
  var url = req.protocol + "://" + req.hostname + ":" + global.port + "/";
  localStorage.removeItem('token');
  res.redirect(url);
});

module.exports = router;
