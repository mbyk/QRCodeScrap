'use strict';

const express = require('express');
const router = express.Router();
const parseUser = require('../parseUser');
const axios = require('axios');

router.get('/qrcode', (req, res, next) => {

  const user = parseUser(req);

  const apiToken = req.session.apiToken;
  const page = req.query.page || 1;

  if (!user) {
    res.redirect('/');
    return
  }

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

  http.get(`/my/qrcode?page=${page}`)
    .then((res) => res.data)
    .then((json) => {
      let results = json.results;
      let meta = json.meta;

      res.render('my/qrcode', {
        title: '自分の投稿',
        user: user,
        myQrcodes: results,
        meta: meta
      });
    }
  )

    // async function getQrcodeBase64(data) {
    //   return axios(`http://localhost:8000/api/v1/qrcode/generate?mode=base64&qrcode_data=${data}`)
    //   .then((res) => res.data)
    //   .then((json) => `${encodeURIComponent(data)}:${json.content}`)
    //   .catch((err) => {
    //     console.log(`err: ${err}`);
    //   })
    // }

    // console.log('1');
    // const qrcodeUuidPromises = results.map((d) => getQrcodeBase64(`http://localhost:3000/qrcode/${d.qrcode_uuid}`))

    // let map = {};
    // Promise.all(qrcodeUuidPromises)
    //   .then((resultsAll) => {
    //     console.log(`resultsAll: ${resultsAll}`);
    //     resultsAll.forEach((i) => {
    //       const splits = i.split(':');
    //       const qrcodeUuid = splits[0];
    //       const base64img = splits[1];
    //       map[qrcodeUuid] = base64img;
    //       console.log('uuid: ' + qrcodeUuid)
    //       console.log('base64img: ' + base64img);

    //       console.log('map: ' + JSON.stringify(map));
    //     });

    //     const _results = results.map((result) => {
    //       const base64img = map[encodeURIComponent(`http://localhost:3000/qrcode/${result.qrcode_uuid}`)];
    //       return Object.assign(result, { base64img: base64img });
    //     });
    //     console.log('_result: ' + JSON.stringify(_results));
    //     res.render('my/qrcode', {
    //       title: '自分の投稿',
    //       user: user,
    //       myQrcodes: _results 
    //     }); 
    // }
    .catch((reject) => {
      console.log('reject: ' + reject)
      res.render('my/qrcode', {
        title: '自分の投稿',
        user: user,
        myQrcodes: []
      });
    });

});



module.exports = router;