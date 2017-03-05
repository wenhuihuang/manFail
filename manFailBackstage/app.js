var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var banner = require('./routes/banner');
var upload = require('./routes/upload');

var jwt = require('jwt-simple');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');


//app.set('jwtTokenSecret','newsFront')

// uncomment after placing your favicon in /public
//article.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret : '12345',
  name : 'manFail', //这里的name值是cookie的name，默认cookie的name是：connect.sid
  cookie : {maxAge : 800000}, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave : false,
  saveUninitialized : false,
  rolling:true
}))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'publics')));



/*article.use(function (req,res,next) {
  if(req.session.user != undefined){
    console.log('当前session里的用户是：'+req.session.user.userName)
    var _user = req.session.use;
    article.locals.user = _user;
  }

  return next()

})*/
app.use('/newBack', index);
app.use('/newBack/user', user);
app.use('/newBack/article',article);
app.use('/API/newBack/article',article);
app.use('/newBack/banner',banner);
app.use('/newBack/upload',upload);
app.use('/API/newBack/banner',banner);

app.use('/API/newBack/user',user);



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
