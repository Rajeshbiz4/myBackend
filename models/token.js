'use strict';
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var Tokens = sequelize.define('Tokens', {
    Token_id: {
      type: DataTypes.STRING
    }
  });
  return Tokens;
};
