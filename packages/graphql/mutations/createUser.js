const uuid = require('uuid/v4');
const User = require('../models/User');
const jwt = require('../lib/jwt');

const createUser = async (parent, { email, password }) => {
  const user = await User.query().insert({
    id: uuid(),
    email,
    password,
  });
  return {
    ...user,
    token: jwt(user.id, user.email),
  };
};

module.exports = createUser;
