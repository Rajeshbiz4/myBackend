'use strict';

var Hapi = require('hapi');

var Pack = require('./package');
var gcm = require('node-gcm');
var server = new Hapi.Server();
var models = require('./models');



//load custom modules



//load custom modules


module.exports = {};

var cors = {
  additionalHeaders: ['if-modified-since', 'accept', 'expiry', 'access-token']
};


server.connection({
  port: 3400,
  routes: {
    cors: cors,
    payload: {
      maxBytes: 209715200
    }
  }
});



var device_token;

// api.post('/register', function(req, res) {
//   device_token = req.body.device_token;
//   console.log('device token received');
//   console.log(device_token);
//   /*YOUR TODO: save the device_token into your database*/
//   res.send('ok');
// });


// api.get('/push', function(req, res) {
//
//   var device_tokens = []; //create array for storing device tokens
//   var retry_times = 4; //the number of times to retry sending the message if it fails
//
//   var sender = new gcm.Sender('AIzaSyAfdB_eM_TcQAIQEAVVaFJhpzBEehvuTQw'); //create a new sender
//   var message = new gcm.Message(); //create a new message
//
//   message.addData('title', 'New Message');
//   message.addData('message', 'Hello this is a push notification');
//   message.addData('sound', 'notification');
//
//   message.collapseKey = 'testing'; //grouping messages
//   message.delayWhileIdle = true; //delay sending while receiving device is offline
//   message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline
//
//   /*
//   YOUR TODO: add code for fetching device_token from the database
//   */
//
//   device_tokens.push(device_token);
//
//   sender.send(message, device_tokens, retry_times, function(result) {
//     console.log(result);
//     console.log('push sent to: ' + device_token);
//   });
//
//   res.send('ok');
// });


// api.route({
//   method: 'GET',
//   path: '/register',
//   handler: function(request, reply) {
//     console.log("/fist called!");
//     device_token = req.body.device_token;
//     console.log("device_token", device_token);
//     reply('Hello');
//   }
// });
//register user
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

//start listening
models.sequelize.sync().then(function() {
  server.start(function() {
    console.log("server start at:===", server.info.uri)
  });
});



//if all modules found, initialize db connection
