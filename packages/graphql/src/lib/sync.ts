import 'dotenv/config';
import * as db from './db';
import { User } from '../entity/User';
import { Server } from '../entity/Server';

const sync = async () => {
  const connection = await db.init();
  await connection.dropDatabase();
  await connection.synchronize();
  await connection.manager.insert(User, {
    email: 'test@example.com',
    password: 'example',
  });
  await connection.manager.insert(Server, {
    id: 'gra001',
    host: 'localhost',
    port: '8112',
    protocol: 'http',
    region: 'eu-west-1',
  });
  await connection.close();
};

sync();
