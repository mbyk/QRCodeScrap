'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('./parseUser');
const axios = require('axios');

router.get('/', (req, res, next) => {

  const user = parseUser(req);

  if (!user) {
    res.redirect('/');
    return;
  }

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

  http.get('/mylist')
    .then((res) => res.data)
    .then((json) => {
      console.log(`${JSON.stringify(json)}`)
      res.render('mylist', {
        title: 'マイリスト',
        user: user,
        qrcodes: json.results
      });
    })
    .catch((err) => {
     res.render('mylist', {
        title: 'マイリスト',
        user: user,
        qrcodes: [] 
      });
    });

});

module.exports = router;