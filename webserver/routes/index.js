var express = require('express');
var router = express.Router();
var parseUser = require('./parseUser');
var axios = require('axios');
var config = require('../config');

const title = 'ホーム';

router.get('/', function(req, res, next) {
  const user = parseUser(req);

  console.log(`page=> ${req.query.page}`);
  const page = req.query.page || 1;

  axios.get(`http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1/qrcodes?page=${page}`)
    .then((res) => res.data)
    .then((json) => {
      console.log(JSON.stringify(json))
      res.render('index', { title: title, user: user, qrcodes:json.results, meta: json.meta });
    })
    .catch((err) => {
      res.render('index', { title: title, user: user, qrcodes: [], meta: null});
    });

});

module.exports = router;
