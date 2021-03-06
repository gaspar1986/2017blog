var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

//引入session中间件 req.session
var session = require('express-session');
var mongnoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');
app.engine('html',ejs.__express);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'tyg',
  resave:true,//每次响应结束后都保存一下session的数据
  saveUninitialized:true,//保存新创建但未初始化的session
  store:new mongnoStore({
    url:config.dbUrl
  })
}));
app.use(flash());//放在session的后面
//由于有公共的页面，所以需要需要locals来进行赋值，res.locals才是真正渲染对象
app.use(function (req,res,next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

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
