'use strict';

var config = require('../config');
const jwt = require('jsonwebtoken');

function apiToken(req) {
  const authorizationHeader = req.get('Authorization');
  const apiToken = authorizationHeader.split('Bearer ')[1];
  return apiToken;
}

module.exports = apiToken;