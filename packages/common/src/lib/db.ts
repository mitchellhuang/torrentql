import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from '../entities/User';
import { Torrent } from '../entities/Torrent';
import { Server } from '../entities/Server';
import { BillingUsage } from '../entities/BillingUsage';
import { BillingPeriod } from '../entities/BillingPeriod';
import { BillingHistory } from '../entities/BillingHistory';
import { ApiKey } from '../entities/ApiKey';

export const createConnectionFromEnv = () => createConnection({
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
    BillingUsage,
    BillingPeriod,
    BillingHistory,
    ApiKey,
  ],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
});
