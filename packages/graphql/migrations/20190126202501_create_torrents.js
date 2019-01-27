
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('torrents', (table) => {
      table.uuid('id').primary();
      table.string('magnet');
      table.string('file');
      table.uuid('user_id').references('users.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('torrents'),
  ]);
};
