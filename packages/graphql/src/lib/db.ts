import { createConnection } from 'typeorm';
import { join } from 'path';

export const init = async () => {
  return createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, 'entity/*.ts'),
    ],
    synchronize: true,
  });
}
