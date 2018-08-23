'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');
const config = require('../..//config');
const axios = require('axios');

const title = '詳細'

router.get('/:id', (req, res, next) => {
  const user = parseUser(req);
  const qrcodeId = req.params.id

  axios.get(`http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1/qrcodes/${qrcodeId}`)
    .then((res) => res.data)
    .then((json) => {
      console.log(`json: ${json}`)
      if (json.status === 'OK') {
        res.render('qrcode/show', {
          title: title,
          user: user,
          qrcode: json.result
        });
      } else {
        res.render('qrcode/show', {
          title: title,
          user: user
        });
      }
    })
    .catch((err) => {
      res.render('qrcode/show', {
        title: title,
        user: user
      });
    });

});

module.exports = router;