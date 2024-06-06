const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const chatModel = require('../models/chat'); // Adjust the path as needed
const app = require('../app'); // Adjust the path as needed

const server = http.createServer(app);
const io = socketIo(server);

// Socket.io setup
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

// Export the handler for Vercel
module.exports = (req, res) => {
  server.emit('request', req, res);
};
