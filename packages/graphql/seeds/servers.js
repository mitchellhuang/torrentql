exports.seed = function (knex) {
  return knex('servers').del()
    .then(() => knex('servers').insert([
      { id: 'gra001', host: 'localhost', port: '8112', region: 'eu-west-1' },
    ]));
};
