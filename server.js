'use strict';

var Hapi = require('hapi');
var Pack = require('./package');
var gcm = require('node-gcm');
var server = new Hapi.Server();
var models = require('./models');

module.exports = {};

var cors = {
  additionalHeaders: ['if-modified-since', 'accept', 'expiry', 'access-token']
};

server.connection({
  port: process.env.PORT,
  routes: {
    cors: cors,
    payload: {
      maxBytes: 209715200
    }
  }
});

var device_token;


server.register({
    register: require('./modules/user/usercontroller.js'),
  },
  function(err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }
  });

//register notification
server.register({
    register: require('./modules/notification/notificationController.js'),
  },
  function(err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }
  });

//register token
server.register({
    register: require('./modules/token/tokenController.js'),
  },
  function(err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }
  });

server.timeout = 60000;
models.sequelize.sync().then(function() {
  server.start(function() {
    console.log("Rajesh Your server is started:Congratulations")
    console.log("server start at:===", server.info.uri)
  });
});

