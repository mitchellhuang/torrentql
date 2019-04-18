const { Model } = require('objection');

class Server extends Model {
  static get tableName() {
    return 'servers';
  }

  static get relationMappings() {
    const Torrent = require('./Torrent');
    return {
      torrent: {
        relation: Model.HasManyRelation,
        modelClass: Torrent,
        join: {
          from: 'servers.id',
          to: 'torrents.server_id',
        },
      },
    };
  }
}

module.exports = Server;
