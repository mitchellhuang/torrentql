import { createConnection } from 'typeorm';
import { join } from 'path';

export const init = () => createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === 'true',
  entities: [
    join(__dirname, '../entities/*.js'),
  ],
  synchronize: true,
});
