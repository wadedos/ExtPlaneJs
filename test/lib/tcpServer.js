'use strict';

const net = require('net');
const debug = require('debug')('extplane:tcpServer');
let server;

function setup() {
  return new Promise((resolve) => {
    const port = 51000;
    server = net.createServer();
    server.listen(port, () => {
      debug(`Listening %o`, port);
      resolve(server);
    });
  });
}

function tearDown() {
  return new Promise((resolve) => {
    if (!server) {
      debug('no server close');
      return resolve();
    }
    server.close(() => {
      debug('close');
      resolve();
    });  
  });
}

module.exports = {
  setup,
  tearDown,
}