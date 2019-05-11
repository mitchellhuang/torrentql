import { Model, RelationMappings } from 'objection';
import Password from 'objection-password';
import { join } from 'path';
import Torrent from './Torrent';

class User extends Password()(Model) {
  id: string;
  email: string;
  password: string;
  torrents: Torrent[];

  static tableName = 'users';

  static relationMappings: RelationMappings = {
    torrent: {
      relation: Model.HasManyRelation,
      modelClass: join(__dirname, 'Torrent'),
      join: {
        from: 'users.id',
        to: 'torrents.user_id',
      },
    },
  }
}

export default User;
