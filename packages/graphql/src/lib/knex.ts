import knex from 'knex';
import { Model } from 'objection';

const Knex = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: !!process.env.DB_SSL,
  },
  pool: { min: 1, max: 1 },
});

Model.knex(Knex);

export default Knex;
