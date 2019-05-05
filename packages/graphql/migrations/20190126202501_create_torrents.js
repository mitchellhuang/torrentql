
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('torrents', (table) => {
      table.uuid('id').primary();
      table.enum('status', ['pending', 'active', 'deleted']).index().notNullable();
      table.text('hash').index().notNullable();
      table.enum('type', ['file', 'magnet']);
      table.text('data').notNullable();
      table.text('server_id').references('servers.id');
      table.uuid('user_id').references('users.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('torrents'),
  ]);
};
