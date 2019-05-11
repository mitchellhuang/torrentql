import User from '../models/User';
import jwt from '../lib/jwt';

const login = async (parent, args) => {
  const { email, password } = args;
  const user = await User.query().first().where({ email });
  if (!user) {
    throw new Error('User not found.');
  }
  const passwordValid = await user.verifyPassword(password);
  if (!passwordValid) {
    throw new Error('Invalid password.');
  }
  return {
    ...user,
    token: jwt(user.id, user.email),
  };
};

export default login;
