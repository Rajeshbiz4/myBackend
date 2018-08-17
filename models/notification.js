'use strict';
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    Description: {
      type: DataTypes.STRING
    }
  });
  return Notification;
};
