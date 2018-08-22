'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');

router.get('/', (req, res, next) => {

  const user = parseUser(req);

  res.render('mylist', {
    title: 'マイリスト',
    user: user
  });
});

module.exports = router;