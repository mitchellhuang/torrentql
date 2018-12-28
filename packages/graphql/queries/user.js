const User = require('../models/User');

const user = async () => {
  const result = await User.query();
  console.log(result);
  return 'hello world';
};

module.exports = user;
