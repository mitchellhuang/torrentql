const { Model } = require('objection');

class Torrent extends Model {
  static get tableName() {
    return 'torrents';
  }

  static get relationMappings() {
    const User = require('./User');
    const Server = require('./Server');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'torrents.user_id',
          to: 'users.id',
        },
      },
      server: {
        relation: Model.BelongsToOneRelation,
        modelClass: Server,
        join: {
          from: 'torrents.server_id',
          to: 'servers.id',
        },
      },
    };
  }
}

module.exports = Torrent;
