'use strict';

//load node modules
var Boom = require('boom');
//var Joi = require('joi');

//custom modules
//response formatter
var responseFormatter = require('../../utils/responseformatter.js');
var TokenService = require('./tokenService.js');
//var UserModel = require('./sitemodel.js');


module.exports = {};


module.exports.register = function(server, options, next) {

  server.route([{
    method: 'POST',
    path: '/registerDemo',
    config: {
      auth: false,
      handler: getAllTokens,
      //swagger related
      description: 'Create createToken',
      notes: 'Create a new createToken',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }, {
    method: 'GET',
    path: '/tokens',
    config: {
      auth: false,
      handler: getAllTokens,
      //swagger related
      description: 'getAllTokens getAllTokens',
      notes: 'getAllTokens a new createTgetAllTokensoken',
      tags: ['api'],
      plugins: {},
      validate: {}
    }
  }]);

  next();
};


module.exports.register.attributes = {
  name: 'aqua_phoenix-token-module',
  version: '0.0.1'
};



var createToken = function(request, reply) {
  var payload = request.payload;
  console.log("payload recieved is :: ", payload);
  TokenService.createToken(payload, function(response) {

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

var getAllTokens = function(request, reply) {
  var payload = request.payload;
  TokenService.getAllTokens(payload, function(response) {
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
