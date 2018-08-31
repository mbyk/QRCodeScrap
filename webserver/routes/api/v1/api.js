'use strict';

const express = require('express');
const router = express.Router();
var axios = require('axios');
var config = require('../../../config')
const apiTokenFetcher = require('../../apiTokenFetcher');
const apiTokenEnsurer = require('../../apiTokenEnsurer');;


router.delete('/qrcodes/:id', apiTokenEnsurer, (req, res, next) => {

  const qrcodeUuid = req.params.id;
  const apiToken = apiTokenFetcher(req);

  if (apiToken) {

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
  
    http.delete(`/qrcodes/${qrcodeUuid}`)
      .then((res) => res.data)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        res.json({ status: 'NG', message: 'request error.' });
      });

    } else {
      res.json({ status: 'NG', message: 'Api token not correct.' });
    }

});

router.get('/qrcode_status/:id', apiTokenEnsurer ,(req, res, next) => {

  const qrcodeUuid = req.params.id;
  const apiToken = apiTokenFetcher(req);

  if (apiToken) {
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
  
    http.get(`/qrcode_status/${qrcodeUuid}`)
      .then((res) => res.data)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        res.json({ status: 'NG', message: 'request error.' });
      });
  
  } else {
      res.json({ status: 'NG', message: 'Api token not correct.' });
  }


});

router.get('/mylist_status/:id', apiTokenEnsurer, (req, res, next) => {

  const qrcodeUuid = req.params.id;
  const apiToken = apiTokenFetcher(req);

  if (apiToken) {
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
  
    http.get(`/mylist_status/${qrcodeUuid}`)
      .then((res) => res.data)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        res.json({ status: 'NG', message: 'request error.' });
      });
  
  } else {
      res.json({ status: 'NG', message: 'Api token not correct.' });
  }

 
});

router.post('/qrcodes/:id', apiTokenEnsurer, (req, res, next) => {

  const qrcodeUuid = req.params.id;
  const mode = req.query.mode;
  const apiToken = apiTokenFetcher(req);

  if (apiToken) {

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
  
    http.post(`/qrcodes/${qrcodeUuid}`, {
      mode: `${mode}`
    })
      .then((res) => res.data)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        res.json({ status: 'NG', message: 'request error.' });
      });
  } else {
      res.json({ status: 'NG', message: 'Api token not correct.' });
  }


});


router.post('/mylist/:id', apiTokenEnsurer, (req, res, next) => {

  const qrcodeUuid = req.params.id;
  const mode = req.query.mode;
  const apiToken = apiTokenFetcher(req);

  if (apiToken) {
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
  
    http.post(`/mylist/${qrcodeUuid}`, {
      mode: `${mode}`
    })
      .then((res) => res.data)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        res.json({ status: 'NG', message: 'request error.' });
      });
  } else {
      res.json({ status: 'NG', message: 'Api token not correct.' });
  }


});




module.exports = router;