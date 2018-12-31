const me = require('./queries/me');
const login = require('./mutations/login');
const createUser = require('./mutations/createUser');
const deleteUser = require('./mutations/deleteUser');

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    createUser,
    deleteUser,
  },
};

module.exports = resolvers;
