const express = require('express');
const app = express();
const config = require('../config');
const proxyMiddleware = require('http-proxy-middleware');
const proxyTable = config.prod.proxyTable;
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const requestIp = require('request-ip');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const swig = require('swig');
// const connect = require('connect');

const { serverApi, db } = require('./api');

app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', './dist');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('html', swig.renderFile);
app.use(express.static('dist', {'extensions': ['html']}));
app.use(express.query());

// Error Handlers
if (app.get('env') === 'development') {
  // development error handler, will print stacktrace
  renderError(true);
} else {
  // production error handler, no stacktrace leaked to user
  renderError(false);
}
function renderError(sendErrorObj) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: sendErrorObj ? err : {}
    });
  });
}

app.get('/test', (req, res, next) => {
  const address = req.clientIp;
  console.log(address, req.ip);
  res.json('test');
});

app.get('/home', (req, res, next) => {
  res.render('index');
});

app.use('/api', serverApi);

const port = 3000;

Promise.resolve()
  .then(() => db.open('./database.sqlite', { Promise }))
  .catch(err => console.error(err.stack))
  .finally(() => app.listen(port, err => { console.log("http oppened on " + port); }))
