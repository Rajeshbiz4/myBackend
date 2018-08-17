'use strict';

//load node modules
var Boom = require('boom');
//var Joi = require('joi');

//custom modules
//response formatter
var responseFormatter = require('../../utils/responseformatter.js');
var NotificationService = require('./notificationService.js');
var UserService = require('../user/userservice.js');



//var UserModel = require('./sitemodel.js');

module.exports = {};

module.exports.register = function(server, options, next) {

  server.route([{
    method: 'POST',
    path: '/create/notification',
    config: {
      auth: false,
      handler: createNotification,
      //swagger related
      description: 'Create notification',
      notes: 'Create a new notification',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }, {
    method: 'GET',
    path: '/notification',
    config: {
      auth: false,
      handler: getAllnotifications,
      //swagger related
      description: 'get notification',
      notes: 'get a new notification',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }]);
  next();
};

module.exports.register.attributes = {
  name: 'aqua_phoenix-users-module',
  version: '0.0.1'
};


var createNotification = function(request, reply) {

var accountSid = 'AC56d3afeecf9969f7e4f82d1951818554'; // Your Account SID from www.twilio.com/console
var authToken = '6ac0ded1fe64373a91804bbadf8119ad';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
  var payload = request.payload;

  UserService.getAllUser(payload, function(response) {
      var Users = []
       Users = response.data ;
      for(var i=0;i<Users.length;i++){
        console.log("Userdata-------",Users[i]);
        var mobileNumber = '+91'+ Users[i].Username;
        client.messages.create({
            to: mobileNumber,  // Text this number
            from: '+15042649204' ,// From a valid Twilio number
              body: payload.Description
         }, function(err, message) {
            console.log(message);
            console.log(err);
         });
      }
  })




  console.log("Request",payload.Description);
  console.log("payload recieved is :: ", payload);
  NotificationService.createNotification(payload, function(response) {
    try {

      if (response === null || response === undefined) {
        var msg = "User creation failed. Please try again.";
        reply(Boom.notFound(msg));
      } else {
        //logger.debug("user returned by create:", user);
        if (response.status == 'success') {

          reply(response);
        } else {
          if (response.error_type == 'validation_error') {
            responseFormatter.formatValidationErrorResponse(response.data,
              reply);
          } else {
            if (response.status == 'success') {
              reply(response);
            } else if (response.status == 'error') {
              reply(Boom.badRequest(response.message))
            } else {
              reply(response);
            }

          }
        }
      }
    } catch (e) {

      reply(Boom.badImplementation(e.message));
    }
  });

};



/**
 * Function for get all notifiction from DB
 */

var getAllnotifications = function(request, reply) {
  var payload = request.payload;
  console.log("payload recieved is :: ", payload);
  NotificationService.getAllnotification(payload, function(response) {
    try {

      if (response === null || response === undefined) {
        var msg = "User creation failed. Please try again.";
        reply(Boom.notFound(msg));
      } else {
        //logger.debug("user returned by create:", user);
        if (response.status == 'success') {

          reply(response);
        } else {
          if (response.error_type == 'validation_error') {
            responseFormatter.formatValidationErrorResponse(response.data,
              reply);
          } else {
            if (response.status == 'success') {
              reply(response);
            } else if (response.status == 'error') {
              reply(Boom.badRequest(response.message))
            } else {
              reply(response);
            }

          }
        }
      }
    } catch (e) {

      reply(Boom.badImplementation(e.message));
    }
  });

};
