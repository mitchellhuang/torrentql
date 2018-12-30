const uuid = require('uuid/v4');
const User = require('../models/User');

const createUser = (parent, args) => {
  const { email, password } = args;
  return User.query().insert({
    id: uuid(),
    email,
    password,
  });
};

module.exports = createUser;
