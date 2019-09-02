import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { User } from '@torrentql/common/dist/entities/User';
import { Server } from '@torrentql/common/dist/entities/Server';

const sync = async () => {
  const connection = await createConnectionFromEnv();
  await connection.dropDatabase();
  await connection.synchronize();
  await connection.manager.insert(User, {
    id: '08610184-31ec-462a-882e-76ba48a12d55',
    email: 'test@example.com',
    password: '$2a$10$IwpYVnIhBS3GJKHSfVIZduMgyHNxXVKI6tR9kuW8u2yhn0Azg8HlC',
  });
  await connection.manager.insert(Server, {
    id: 1,
    tag: 'gra001',
    region: 'eu-west-1',
    delugeUrl: 'http://localhost:8112/',
    fileUrl: 'http://localhost:3001/files/',
  });
  await connection.close();
};

sync();
