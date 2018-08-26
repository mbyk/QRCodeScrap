var express = require('express');
var router = express.Router();
var parseUser = require('./parseUser');
var axios = require('axios');
var config = require('../config');

const title = 'ホーム';

router.get('/', function(req, res, next) {
  const user = parseUser(req);

  axios.get(`http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1/qrcodes`)
    .then((res) => res.data)
    .then((json) => {
      console.log(JSON.stringify(json))
      res.render('index', { title: title, user: user, qrcodes:json.results });
    })
    .catch((err) => {
      res.render('index', { title: title, user: user, qrcodes: []});
    });

});

module.exports = router;
