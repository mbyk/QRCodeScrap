var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var loginAccessDenyHandler = require('./routes/loginAccessDenyHandler')
var helmet = require('helmet');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
var qrcodeEdit = require('./routes/qrcode/edit');
var qrcodeShow = require('./routes/qrcode/show');
var qrcodeNew = require('./routes/qrcode/new');
var mylist = require('./routes/mylist');
var myQRCode = require('./routes/my/qrcode');
var api = require('./routes/api/v1/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(session({
  store: new RedisStore({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  }),
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use('/', index);
app.use('/users', users);
app.use('/login', loginAccessDenyHandler, login);
app.use('/logout', logout);
app.use('/signup', loginAccessDenyHandler, signup);
app.use('/mylist', mylist);
app.use('/my', myQRCode);
app.use('/qrcode', qrcodeNew);
app.use('/qrcode', qrcodeEdit);
app.use('/qrcode', qrcodeShow);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
