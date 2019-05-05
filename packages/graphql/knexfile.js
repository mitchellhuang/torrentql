// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'torrentql',
      user: 'torrentql',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'torrentql',
      user: 'torrentql',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
