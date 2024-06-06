const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb+srv://nodejs-chat:nodejs-chat@nodejs-chat.khttal0.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-chat'
);
