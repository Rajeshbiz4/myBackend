'use strict';

//load node modules
var Boom = require('boom');
//var Joi = require('joi');

//custom modules
//response formatter
var responseFormatter = require('../../utils/responseformatter.js');
var UserService = require('./userservice.js');
//var UserModel = require('./sitemodel.js');


module.exports = {};


module.exports.register = function(server, options, next) {

  server.route([{
    method: 'POST',
    path: '/create/user',
    config: {
      auth: false,
      handler: createUser,
      //swagger related
      description: 'Create User',
      notes: 'Create a new user',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }, {
    method: 'GET',
    path: '/Users',
    config: {
      auth: false,
      handler: getAllUser,
      //swagger related
      description: 'getAllUser',
      notes: 'getAllUser',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }, {
    method: 'PUT',
    path: '/user',
    config: {
      auth: false,
      handler: UpdateUser,
      //swagger related
      description: 'Create User',
      notes: 'Create a new user',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }, {
    method: 'DELETE',
    path: '/user',
    config: {
      auth: false,
      handler: deleteUser,
      //swagger related
      description: 'deleteUser User',
      notes: 'deleteUser a new user',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }]);

  next();
};

module.exports.register.attributes = {
  name: 'aqua_phoenix-notification-module',
  version: '0.0.1'
};



var createUser = function(request, reply) {
  var payload = request.payload;
  console.log("payload recieved is :: ", payload);
  UserService.createUser(payload, function(response) {

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
 * Function for get all Users
 */

var getAllUser = function(request, reply) {
  var payload = request.payload;
  UserService.getAllUser(payload, function(response) {
    try {

      if (response === null || response === undefined) {
        var msg = "UserList failed. Please try again.";
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
 * Function for Update user
 */
var UpdateUser = function(request, reply) {
  var payload = request.payload;
  console.log("payload recieved is :: ", payload);
  UserService.UpdateUser(payload, function(response) {

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
 * Function for delete user
 */
var deleteUser = function(request, reply) {
  var payload = request.payload;
  console.log("payload recieved is :: ", payload);
  UserService.deleteUser(payload, function(response) {
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
