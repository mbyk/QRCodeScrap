'use strict';

function parseUser(req) {
  if (!!req.session && !!!req.session.userId) {
    return null;
  }

  return {
    userId: req.session.userId
  }
}

module.exports = parseUser;