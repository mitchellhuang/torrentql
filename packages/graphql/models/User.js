const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
  static get tableName() {
    return 'users'
  }
}

module.exports = User;
