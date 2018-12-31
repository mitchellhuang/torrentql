const User = require('../models/User');

const deleteUser = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  const result = await User.query().findById(context.user.id).delete();
  return !!result;
};

module.exports = deleteUser;
