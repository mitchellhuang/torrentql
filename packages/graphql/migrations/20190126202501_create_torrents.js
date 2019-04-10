
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('torrents', (table) => {
      table.uuid('id').primary();
      table.enu('status', ['pending', 'active', 'deleted']);
      table.string('file');
      table.string('magnet');
      table.uuid('user_id').references('users.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('torrents'),
  ]);
};
