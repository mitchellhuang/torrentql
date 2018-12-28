const knex = require('knex');
const { Model } = require('objection');

const knexClient = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

Model.knex(knexClient);

module.exports = knexClient;
