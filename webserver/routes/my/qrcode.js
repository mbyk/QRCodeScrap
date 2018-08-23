'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');
const axios = require('axios');

router.get('/qrcode', (req, res, next) => {

  const user = parseUser(req);

  const apiToken = req.session.apiToken;

  const http = axios.create({
    baseURL: `http://localhost:8000/api/v1`
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

  http.get('/my/qrcode')
    .then((res) => res.data)
    .then((json) => {
      console.log(`${JSON.stringify(json)}`)
      res.render('my/qrcode', {
        title: '自分の投稿',
        user: user,
        myQrcodes: json.results
      });
    })
    .catch((err) => {
     res.render('my/qrcode', {
        title: '自分の投稿',
        user: user,
        myQrcodes: [] 
      });
    });

});

module.exports = router;