const User = require('../models/User');

const me = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  return User.query().findById(context.user.id);
};

module.exports = me;
