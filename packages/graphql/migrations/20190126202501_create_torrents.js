
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('torrents', (table) => {
      table.uuid('id').primary();
      table.enu('status', ['pending', 'active', 'deleted']).index();
      table.text('file');
      table.text('magnet');
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
