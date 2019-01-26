const Password = require('objection-password')();
const { Model } = require('objection');

class Torrent extends Password(Model) {
  static get tableName() {
    return 'torrents';
  }
}

static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'torrents.uuid',
        to: 'persons.id'
      }
    }
  }

module.exports = Torrent;