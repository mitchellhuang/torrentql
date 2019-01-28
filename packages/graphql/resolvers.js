const me = require('./queries/me');
const login = require('./mutations/login');
const createUser = require('./mutations/createUser');
const deleteUser = require('./mutations/deleteUser');
const addTorrent = require('./mutations/addTorrent');

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    createUser,
    deleteUser,
    addTorrent,
  },
  User: {
    torrents(user) {
      return user.$relatedQuery('torrent');
    },
  },
  Torrent: {
    user(torrent) {
      return torrent.$relatedQuery('user');
    },
  },
};

module.exports = resolvers;
