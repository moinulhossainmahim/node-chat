const httpErrors = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const morgan = require('morgan');
const passport = require('./config/passport');

const pagesRoute = require('./routes/pages');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const usersRoute = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(expressSession({ secret: 'chat', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }));
passport(app);
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.auth = req.user ? true : false;
  res.locals.guest = req.user ? false : true;
  next();
});

app.use('/', pagesRoute);
app.use('/', authRoute);
app.use('/profile', profileRoute);
app.use('/users', usersRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
