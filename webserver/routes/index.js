var express = require('express');
var router = express.Router();
var parseUser = require('./parseUser');
var axios = require('axios');

router.get('/', function(req, res, next) {
  const user = parseUser(req);

  if (user) {
    axios.get('http://localhost:8000/api/v1/qrcodes')
      .then((res) => res.data)
      .then((json) => {
        console.log(JSON.stringify(json))
        res.render('index', { title: 'Express', user: user, qrcodes:json.results });
      })
      .catch((err) => {
        res.render('index', { title: 'Express', user: user, qrcodes: []});
      });

  } else {
    res.render('index', { title: 'Express', user: user });
  }


});

module.exports = router;
