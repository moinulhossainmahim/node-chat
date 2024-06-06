const moment = require('moment');

const chatModel = require('../models/chat');

const pagesController = {
  home: (req, res) => {
    res.render('pages/home', { title: 'Chat' });
  },

  chat: (req, res) => {
    chatModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user')
      .exec()
      .then(chats => res.render('pages/chat', {
        title: 'Chat',
        chats: chats,
        user: req.user,
        moment: moment,
      }));
  },
};

module.exports = pagesController;
