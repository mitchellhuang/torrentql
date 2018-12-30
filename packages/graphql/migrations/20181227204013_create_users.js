exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.uuid('id').primary()
      table.string('email').unique().index()
      table.string('password')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
