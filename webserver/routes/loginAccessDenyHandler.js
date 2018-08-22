'use strict';

const parseUser = require('./parseUser');

function loginAccessDenyHandler(req, res, next) {
  const user = parseUser(req);

  if (user) {
    res.redirect('/');
    return;
  }

  next();
}

module.exports = loginAccessDenyHandler;