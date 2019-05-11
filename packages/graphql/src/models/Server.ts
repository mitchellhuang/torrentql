import { Model } from 'objection';
import { join } from 'path';

class Server extends Model {
  id: string;
  host: string;
  port: string;
  protocol: string;

  static tableName = 'servers';

  static relationMappings = {
    torrent: {
      relation: Model.HasManyRelation,
      modelClass: join(__dirname, 'Torrent'),
      join: {
        from: 'servers.id',
        to: 'torrents.server_id',
      },
    },
  }
}

export default Server;
