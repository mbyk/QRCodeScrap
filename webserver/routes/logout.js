const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.session.destroy((err) => {
    console.log(`err: ${err}`)
    console.log(`req.session: ${req.session}`)
  });
  console.log('logout...')
  res.redirect('/');
});

module.exports = router;