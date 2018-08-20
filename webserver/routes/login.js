const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');

router.get('/', (req, res, next) => {
  const user = parseUser(req);

  res.render('login', {
    title: 'Login',
    user: user
  });
});

router.post('/', (req, res, next) => {
  const email = req.body.email

  // temp user
  if (email === 'temp@example.com') {
    req.session.userId = email;
    res.redirect('/');
  } else {
    const user = parseUser(req);
    res.render('login', {
      title: 'Login',
      user: user
    });
  }
});

module.exports = router;
