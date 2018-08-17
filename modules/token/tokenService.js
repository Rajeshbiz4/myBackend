'use strict';

// logger


var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');

var models = require('../../models');
var bcrypt = require('bcryptjs');
var async = require('async');
// response formatter
var responseFormatter = require('../../utils/responseformatter.js');


var privateKey =
  '_1.2v^:69F61n151EodW+!925;-Cx-;m.*Z2=^y463B+9Z.49^%7I%3b62%z%;+I';


module.exports = {};
/**
 * Checks if the given user id exists in database or not
 *
 * @param {String}
 *            id User Id
 * @param {Function}
 *            callback Callbacl function
 * @return {void}
 */

module.exports.createToken = function(payload, callback) {
  console.log("in tocken service");
  var url = {
    Token_id: payload.Token_id
  };

  var Token = models.Tokens.build(url);
  Token.save()
    .then(function(anotherTask) {
      if (anotherTask) {
        responseFormatter.formatServiceResponse({}, callback,
          "Tokens created successfully.");
      }
    })
};



module.exports.getAllTokens = function(payload, callback) {
  models.Tokens.findAll({}).then(function(users) {
    responseFormatter.formatServiceResponse(users, callback,
      "tokenList fetched successfully.");
  });
};


// module.exports.getAllTokens = function(payload, callback) {
//   console.log("in tocken service");
//   var url = {
//     Token_id: payload.Token_id
//   };
//
//   var Token = models.Tokens.build(url);
//   Token.save()
//     .then(function(anotherTask) {
//       if (anotherTask) {
//         responseFormatter.formatServiceResponse({}, callback,
//           "Tokens created successfully.");
//       }
//     })
// };
