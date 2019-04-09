const knex = require('knex');
const { Model } = require('objection');

const knexClient = knex({
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

Model.knex(knexClient);

module.exports = knexClient;
