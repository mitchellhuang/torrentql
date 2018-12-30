const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User');

const login = async (parent, args, context) => {
  const { email, password } = args;
  const user = await User.query().first().where({ email });
  const passwordValid = await user.verifyPassword(password);
  if (!passwordValid) {
    throw new Error('Invalid password.');
  }
  return {
    ...user,
    token: jsonwebtoken.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_SECRET)
  };
}

module.exports = login;
