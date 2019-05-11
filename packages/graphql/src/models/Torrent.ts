import { Model } from 'objection';
import { join } from 'path';
import User from './User';
import Server from './Server';

class Torrent extends Model {
  id: string;
  hash: string;
  type: 'file' | 'magnet'
  data: string;
  is_active: boolean;
  user: User;
  server: Server;

  static tableName = 'torrents';

  static relationshipMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'User'),
      join: {
        from: 'torrents.user_id',
        to: 'users.id',
      },
    },
    server: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, 'Server'),
      join: {
        from: 'torrents.server_id',
        to: 'servers.id',
      },
    },
  }
}

export default Torrent;
