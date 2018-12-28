const user = require('./queries/user');

const resolvers = {
  Query: {
    user: user
  },
};

module.exports = resolvers;
