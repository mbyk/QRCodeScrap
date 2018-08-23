'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');
const axios = require('axios');
const config = require('../../config');

router.get('/new', (req, res, next) => {

  const user = parseUser(req);
  res.render('qrcode/new', {
    title: '新規作成',
    user: user
  });
})

router.post('/', (req, res, next) => {
  const user = parseUser(req);

  const url = req.body.url
  const title = req.body.title
  const genType = '1'

  const apiToken = req.session.apiToken;

  const http = axios.create({
    baseURL: `http://${config.APPSERVER_HOST}:${config.APPSERVER_PORT}/api/v1`
  })
  http.interceptors.request.use((config) => {
    if (apiToken) {  
      config.headers.Authorization = `Bearer ${apiToken}`
      return config
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })


  http.post('/qrcode', {
    qrcode: {
      title: title,
      gen_type: '1'
    },
    gen_type_url: {
      url: url
    }
  }).then((res) => res.data)
    .then((json) => {
      console.log(JSON.stringify(json))
      res.redirect(`/qrcode/${json.qrcode_uuid}`);
    })
    .catch((err) => {
      res.render('qrcode/new', {
        title: '新規投稿',
        user: user
      });
    });
  
});

module.exports = router;