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
//getAllnotification

module.exports.createNotification = function(payload, callback) {
  var url = {
    Description: payload.Description

  };


  var Notification = models.Notification.build(url);
  Notification.save()
    .then(function(anotherTask) {
      if (anotherTask) {
        responseFormatter.formatServiceResponse({}, callback,
          "Notification created successfully.");
      }
    })
};

module.exports.getAllnotification = function(payload, callback) {
  models.Notification.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(function(anotherTask) {
      if (anotherTask) {
        responseFormatter.formatServiceResponse(anotherTask, callback,
          "Notifications list successfully.");
      }
    })
};


//
// module.exports.getAllnotification = function(callback) {
//
// models.User.findAll({
//   order: [
//     ['FirstName', 'ASC']
//   ]
// }).then(function(users) {
//
// })
//
// }
// })
// }
