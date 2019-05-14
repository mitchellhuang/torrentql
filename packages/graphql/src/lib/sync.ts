import 'dotenv/config';
import * as db from './db';
import { User } from '../entities/User';
import { Server } from '../entities/Server';

const sync = async () => {
  const connection = await db.init();
  await connection.dropDatabase();
  await connection.synchronize();
  await connection.manager.insert(User, {
    id: '08610184-31ec-462a-882e-76ba48a12d55',
    email: 'test@example.com',
    password: '$2a$10$IwpYVnIhBS3GJKHSfVIZduMgyHNxXVKI6tR9kuW8u2yhn0Azg8HlC',
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