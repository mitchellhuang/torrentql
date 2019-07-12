import { createConnection, getConnectionManager, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from '@torrentql/common/dist/entities/User';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { Server } from '@torrentql/common/dist/entities/Server';

export const init = async () => {
  let connection: Connection;
  const connectionManager = getConnectionManager();
  if (connectionManager.has('default')) {
    connection = connectionManager.get();
  } else {
    connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL === 'true',
      entities: [
        User,
        Torrent,
        Server,
      ],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
    });
  }
  return connection;
};
