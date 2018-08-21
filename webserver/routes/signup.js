'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');

router.get('/', (req, res, next) => {

  const user = parseUser(req);

  res.render('signup', {
    title: 'Signup',
    user: user
  });
});

router.post('/', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;