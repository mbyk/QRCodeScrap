const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  res.render('login', {
    title: 'Login'
  });
});

router.post('/', (req, res, next) => {
  const email = req.body.email

  // temp user
  if (email === 'temp@example.com') {
    req.session.userId = email;
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Login'
    });
  }
});

module.exports = router;
