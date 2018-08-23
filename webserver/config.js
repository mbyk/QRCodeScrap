
const config = {
  REDIS_HOST: 'localhost',
  REDIS_PORT: '6379',
  SECRET: process.env.QRCODE_SCRAP_SECRET,
  APPSERVER_HOST: 'localhost',
  APPSERVER_PORT: '8000',
  WEBSERVER_HOST: 'localhost',
  WEBSERVER_PORT: '3000',

}

module.exports = config;
