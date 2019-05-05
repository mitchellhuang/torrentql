const BigInt = require('graphql-bigint');
const { Deluge } = require('@ctrl/deluge');
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
    torrents: user => user.$relatedQuery('torrent'),
  },
  Torrent: {
    data: async (torrent) => {
      const server = await torrent.$relatedQuery('server');
      const deluge = new Deluge({
        baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
        password: 'deluge',
      });
      let data;
      try {
        data = await deluge.getTorrent(torrent.hash);
      } catch (err) {
        data = null;
      }
      return data;
    },
    user: torrent => torrent.$relatedQuery('user'),
    server: torrent => torrent.$relatedQuery('server'),
  },
  BigInt,
};

module.exports = resolvers;
