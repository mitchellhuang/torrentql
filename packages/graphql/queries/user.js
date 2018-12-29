const User = require('../models/User');

const user = async () => {
  const result = await User.query();
  return {
    email: JSON.stringify(result)
  }
};

module.exports = user;
