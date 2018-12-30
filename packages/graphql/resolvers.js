const me = require('./queries/me');
const login = require('./mutations/login');
const createUser = require('./mutations/createUser');

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    createUser,
  },
};

module.exports = resolvers;
