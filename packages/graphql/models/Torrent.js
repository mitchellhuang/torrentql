const { Model } = require('objection');

class Torrent extends Model {
  static get tableName() {
    return 'torrents';
  }

  static get relationMappings() {
    const User = require('./User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'torrents.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Torrent;
