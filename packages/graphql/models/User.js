const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Torrent = require('./Torrent');
    return {
      torrent: {
        relation: Model.HasManyRelation,
        modelClass: Torrent,
        join: {
          from: 'users.id',
          to: 'torrents.user_id',
        },
      },
    };
  }
}

module.exports = User;
