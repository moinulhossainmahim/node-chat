const joi = require('joi');

const userModel = require('../models/user');

const authController = {
  register: (req, res) => {
    res.render('auth/register', { title: 'Register' });
  },

  _register: (req, res) => {
    const schema = joi.object().keys({
      name: joi.string()
        .required(),
      email: joi.string()
        .email()
        .required(),
      password: joi.string()
        .min(6)
        .required(),
      password_confirmation: joi.any()
        .valid(joi.ref('password'))
        .required(),
    });

    const { error: err, value } = schema.validate(req.body);

    if (err) {
      req.flash('error', err.details[0].message);
      return res.redirect(req.header('Referer') || '/register');
    }

    userModel.findOne({ email: value.email })
      .exec()
      .then(resu => {
        if (resu) {
          req.flash('error', 'Email is already in use.');
          return res.redirect(req.header('Referer') || '/register');
        }
  
        delete value.password_confirmation;
  
        value.password = userModel.hashPassword(value.password, 10);
  
        userModel.create(value)
          .then(() => {
            req.flash('success', 'Registration complete, please login.');
  
            return res.redirect('/login');
          });
      });
  },

  login: (req, res) => {
    res.render('auth/login', { title: 'Login' });
  },

  logout: (req, res) => {
    req.logout(() => {
      req.flash('success', 'Logged out successfully.');

      res.redirect('/login');
    });
  },
};

module.exports = authController;
