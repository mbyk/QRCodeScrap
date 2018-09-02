'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');
const axios = require('axios');
const config = require('../config');

router.get('/', (req, res, next) => {
  const user = parseUser(req);

  res.render('signup', {
    title: 'Signup',
    user: user
  });
});

router.post('/', (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password_confirmation = req.body.password_confirmation;

  const user = parseUser(req);

  axios.post(`http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1/signup`, {
    user: {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }
  }).then((res) => res.data)
    .then((json) => {
      req.session.userId = json.user.email;
      req.session.apiToken = json.api_token;

      res.redirect('/');

    }).catch((err) => {
      res.render('signup', {
        title: 'Signup',
        user: user
      });
    })
});

module.exports = router;
