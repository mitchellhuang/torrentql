const user = require('./queries/user');

const resolvers = {
  Query: {
    me: user
  },
};

module.exports = resolvers;
