const uuid = require('uuid/v4');

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: uuid(), email: 'test@example.com', password: '123' },
    ]));
};
