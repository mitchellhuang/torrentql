import uuid from 'uuid/v4';
import User from '../models/User';
import jwt from '../lib/jwt';

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

export default createUser;
