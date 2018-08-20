const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');
const axios = require('axios')

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

    axios.post('http://localhost:8000/api/v1/login')
      .then((res) => res.data)
      .then((json) => {
        req.session.userId = json.user.user_id;
        res.redirect('/');
      }).catch((err) => {
        console.log(`error: ${err}`);

        res.render('login', {
          title: 'Login'
        });
      })

  } else {
    const user = parseUser(req);
    res.render('login', {
      title: 'Login',
      user: user
    });
  }
});

module.exports = router;
