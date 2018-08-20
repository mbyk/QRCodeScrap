var express = require('express');
var router = express.Router();
var parseUser = require('./parseUser');

router.get('/', function(req, res, next) {
  const user = parseUser(req);
  res.render('index', { title: 'Express', user: user });
});

module.exports = router;
