const uuid = require('uuid/v4');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: uuid(), email: 'test@example.com', password: '123' }
      ]);
    });
};
