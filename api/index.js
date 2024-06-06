const express = require('express');
const app = express();
const http = require('http');
const socket = require('../socket');

const server = http.createServer(app);
socket.listen(server);

module.exports = (req, res) => {
  server.emit('request', req, res);
};
