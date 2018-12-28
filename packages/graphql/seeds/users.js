exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { email: 'test@example.com', password: '123', first_name: 'bill', last_name: 'clinton' }
      ]);
    });
};
