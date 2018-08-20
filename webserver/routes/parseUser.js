'use strict';

function parseUser(req) {
  if (!!req.session && !!req.session.userId) {
    return {
      userId: req.session.userId
    }
  }

  return null;
}

module.exports = parseUser;