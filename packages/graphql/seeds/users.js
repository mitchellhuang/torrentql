exports.seed = function (knex) {
  return knex('users').del()
    .then(() => knex('users').insert({
      id: '4fbc4f35-855d-46c0-ba9e-7e664b63e605',
      email: 'test@example.com',
      password: '$2a$12$nqm1rh1NwAXPIr91VnOQTOosKkSqCp.ioOTGXlFEFY33KtzWZoidO',
    }));
};
