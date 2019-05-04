
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('servers', (table) => {
      table.text('id').primary();
      table.text('host').notNullable();
      table.text('port').notNullable();
      table.enum('region', ['eu-west-1', 'ca-east-1']).index().notNullable();
      table.integer('cpu_load');
      table.integer('active_torrents');
      table.integer('total_torrents');
      table.integer('used_space');
      table.integer('total_space');
      table.integer('download_speed');
      table.integer('upload_speed');
      table.integer('port_speed');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('servers'),
  ]);
};
