var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');

var router = express.Router();

router.get('/*', function(req, res, next) {

  var scripts = []
  var css = []

  if (process.env.NODE_ENV == 'development') {
    scripts = [
      'http://localhost:8080/webpack-dev-server.js',
      'http://localhost:8080/public/build/js/vendor.bundle.js',
      'http://localhost:8080/public/build/js/bundle.js'
    ]
  } else {
    var js = glob.sync(
      '/public/build/js/bundle.*.js', {root: __dirname}
    );

    scripts = js.map(function (f) {
      return '/public/build/js/' + path.basename(f);
    });

    var styles = glob.sync(
      '/public/build/css/bundle.*.css', {root: __dirname}
    );

    css = styles.map(function (f) {
      return '/public/build/css/' + path.basename(f);
    });
  }

  res.render('index', { title: 'Express', scripts: scripts, css: css });
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
