const io = require('socket.io')();

const chatModel = require('./models/chat');

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

module.exports = io;
