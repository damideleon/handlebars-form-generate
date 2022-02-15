var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var hbs = require("hbs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forms = require('./routes/form');
var signup = require('./routes/signup-form');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


hbs.registerHelper({
  "ifType": (v1, v2, options) => {
    if(v1 === v2) {
      console.log(options)
      return options;
    }
    return options.inverse(this);
  },
  "fecha": (date) => {
    moment.locale("es")
    return moment(date).format("dddd, D [de] MMMM YYYY, h:mm:ss");
  },
  "fmt_numero": (nro) => {
    nro = nro.split(".")[0]
    return genericos.formato_nro(nro)
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
  name: 'session',
  keys: ['cachulo'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', forms);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
