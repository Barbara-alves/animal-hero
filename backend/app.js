const env = require('dotenv').config();
const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtService = require("jsonwebtoken");

var bodyParser = require('body-parser');

var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}));


const middlewareJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const [_, jwt] = authHeader.split(" ");


  // Efetuando a validação do JWT:
  jwtService.verify(jwt, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          res.status(403).end();
          return;
      }
      req.user = user;
      next();
  });
};


app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use('/users', middlewareJWT, usersRouter);
app.use('/auth',  authRouter);
app.use('/posts', middlewareJWT, postsRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



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
