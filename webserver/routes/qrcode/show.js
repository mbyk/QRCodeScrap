'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');
const config = require('../..//config');
const axios = require('axios');

const title = '詳細'

router.get('/:id', (req, res, next) => {
  const user = parseUser(req);
  const qrcodeUuid = req.params.id

  const apiToken = req.session.apiToken;

  axios.get(`http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1/qrcodes/${qrcodeUuid}`)
    .then((res) => res.data)
    .then((json) => {
      if (json.status === 'OK') {
        res.render('qrcode/show', {
          title: title,
          user: user,
          qrcode: json.result,
          apiToken: apiToken,
          qrcodeUuid: qrcodeUuid
        });
      } else {
  	res.status(404).send('not found.');
      }
    })
    .catch((err) => {
      res.render('qrcode/show', {
        title: title,
        user: user,
        apiToken: apiToken,
        qrcodeUuid: qrcodeUuid
      });
    });

});

module.exports = router;
