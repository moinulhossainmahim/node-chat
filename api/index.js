const http = require('http');
const socketIo = require('socket.io');
const chatModel = require('../models/chat');
const app = require('../app');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log(`Client (${socket.id}) is connected.`);

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('message', data => {
    chatModel.create(data)
      .then(chat => {
        chat.populate('user')
          .then(chat => {
            io.sockets.emit('message', chat);
          });
      });
  });

  socket.on('disconnect', reason => {
    console.log(`Client (${socket.id}) is disconnected.`);
  });
});

module.exports = (req, res) => {
  server.emit('request', req, res);
};
