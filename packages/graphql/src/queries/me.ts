import User from '../models/User';

const me = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  return User.query().findById(context.user.id);
};

export default me;
