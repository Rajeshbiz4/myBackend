/**
 * Module to format response returned from model into a standard format in the service
 * Differentiates between success, validation errors and system errors
 *
 */
'use strict';



var Boom = require('boom');

module.exports = {};

/**
 * Used in services to wrap the data in a standard response format
 */

module.exports.formatServiceResponse = function(data, callback, message, status) {
  var formattedResponse = {
    status: '',
    error_type: '',
    message: '',
    data: ''
  };

  if (data instanceof Error) {
    //check if validation error
    //mongoos validation errors have a name field, we can check instance of as well
    formattedResponse.status = "error";
    formattedResponse.message = data.message;
    if (data.name == 'ValidationError') {
      formattedResponse.error_type = "validation_error";
      formattedResponse.data = data; //send the entire error back
    } else if (data.name == 'AuthenticationError') {
      formattedResponse.status = "error";
      formattedResponse.error_type = "authentication_error";
      formattedResponse.data = {};
    } else if (data.name == "SequelizeValidationError") {
      formattedResponse.status = "error";
      formattedResponse.error_type = "ValidationError";
      formattedResponse.message = data.errors[0].message;
      formattedResponse.data = data;
    } else {
      formattedResponse.error_type = "system_error";
      formattedResponse.message = message || "";
      formattedResponse.data = data;
    }

  } else {
    if (status && status == "error") {
      formattedResponse.status = "error";
      formattedResponse.data = data || "";
      formattedResponse.message = message || "";
    } else {
      //success
      formattedResponse.status = "success";
      formattedResponse.data = data || "";
      formattedResponse.message = message || "";
    }

  }

  callback(formattedResponse);
}

/**
 * Used in controller to format validation errors being returned to front end
 */


module.exports.formatValidationErrorResponse = function(data, callback) {
  //logger.debug('Data in response formatValidationErrorResponse', data);
  var error = Boom.badRequest(data.message, data);
  //error.output.payload.data = {};
  if (data.errors) {
    error.output.payload.data = data.errors;
  }
  callback(error);
}
