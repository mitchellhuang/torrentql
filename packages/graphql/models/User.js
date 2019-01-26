const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }
}

static relationMappings = {
    torrents: {
      relation: Model.HasManyRelation,
      modelClass: Torrent,
      join: {
        from: 'users.id',
        to: 'torrents.uuid'
      }
    }
  }

module.exports = User;
