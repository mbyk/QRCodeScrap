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
  const password = req.body.password

  axios.post('http://localhost:8000/api/v1/login', {
    session: {
      email: email,
      password: password
    }
  })
    .then((res) => res.data)
    .then((json) => {
      req.session.userId = json.user.email;
      req.session.apiToken = json.api_token;
      res.redirect('/');
    }).catch((err) => {
      console.log(`error: ${err}`);

      res.render('login', {
        title: 'Login'
      });
    })

});

module.exports = router;
