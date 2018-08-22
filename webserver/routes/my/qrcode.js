'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');

router.get('/qrcode', (req, res, next) => {

  const user = parseUser(req);
  
  res.render('my/qrcode', {
    title: '自分の投稿',
    user: user
  });
});

module.exports = router;