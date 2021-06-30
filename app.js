var express = require('express');
const AuthRoute = require('./routes/auth')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://projetjspsb:projetjspsb123@puissance4.x602g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err);
})

db.once('open', () => {
  console.log("DB OK");
})

var path = require('path');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();
var session = require('express-session');
var sess = {
    secret: 'keyboard cat',
    cookie: {},
    proxy: true,
    resave: true,
    saveUninitialized: true
  };

app.use(session(sess))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//console.log(path.join(__dirname, 'public', 'favicon.ico'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', AuthRoute); 

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
