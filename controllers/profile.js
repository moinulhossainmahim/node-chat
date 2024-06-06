const joi = require('joi');

const userModel = require('../models/user');

const profileController = {
  show: (req, res) => {
    res.render('profile/show', { title: 'Profile', user: req.user });
  },

  edit: (req, res) => {
    res.render('profile/edit', { title: 'Profile', user: req.user });
  },

  update: (req, res) => {
    const schema = joi.object().keys({
      name: joi.string()
        .required(),
    });

    const { error: err, value } = schema.validate(req.body);

    if (err) {
      req.flash('error', err.details[0].message);
      return res.redirect(req.header('Referer') || '/register');
    }

    userModel.findByIdAndUpdate(req.user._id, value)
      .then(user => {
        req.flash('success', 'Profile updated.');

        return res.redirect('/profile/show');
      });
  },
};

module.exports = profileController;
