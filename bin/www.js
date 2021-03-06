#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('untitled:server');
var http = require('http');
var https = require('https');
var fs = require('fs');

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

var server = null;
var listener = null;

if(app.get('env') === 'test' || app.get('env') === 'development') {
  var options = {
    key: fs.readFileSync('./fixtures/keys/server.key'),
    cert: fs.readFileSync('./fixtures/keys/server.crt')
  };

  /**
   * Create HTTPs server.
   */
  server = https.createServer(options, app);
  listener = server.listen(port, function () {
    console.log('Listening on port ' + listener.address().port);
  });
}else{
  server = http.createServer(app).listen(port)
  listener = server.listen(port, function(){
    console.log('Listening on port http ' + listener.address().port);
  });
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
