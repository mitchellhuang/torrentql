exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.text('email').unique().index();
      table.text('password');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ]);
};
