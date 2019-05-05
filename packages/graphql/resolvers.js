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
      return deluge.getTorrent(torrent.hash);
    },
    user: torrent => torrent.$relatedQuery('user'),
    server: torrent => torrent.$relatedQuery('server'),
  },
};

module.exports = resolvers;
