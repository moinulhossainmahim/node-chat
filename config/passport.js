const passport = require('passport');
const passportLocal = require('passport-local');

const userModel = require('../models/user');

module.exports = ( app ) => {
  app.use(passport.initialize());

  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id)
      .exec()
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });

  passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
  }, (email, password, done) => {
    userModel
      .findOne({ email })
      .exec()
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        if (!userModel.comparePassword(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      })
      .catch(err => done(err));
  }));
};
