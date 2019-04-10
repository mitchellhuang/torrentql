
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('servers', (table) => {
      table.text('id').primary();
      table.enum('region', ['eu-west-1', 'ca-east-1']);
    }),
  ]).then(() => {
    return Promise.all([
      knex('servers').insert({
        id: 's001',
        region: 'eu-west-1',
      }),
    ]);
  });
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('servers'),
  ]);
};
