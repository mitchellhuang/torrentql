const BigInt = require('graphql-bigint');
const { GraphQLJSON } = require('graphql-type-json');
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
    status: async (torrent) => {
      if (!torrent.is_active) {
        return null;
      }
      const server = await torrent.$relatedQuery('server');
      const deluge = new Deluge({
        baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
        password: 'deluge',
        timeout: 1000,
      });
      let status;
      let files;
      try {
        status = await deluge.getTorrentStatus(torrent.hash);
        files = await deluge.getTorrentFiles(torrent.hash);
        status = status.result;
        files = files.result;
        status = {
          name: status.name,
          state: status.state.toLowerCase(),
          progress: status.progress,
          ratio: status.ratio,
          uploadSpeed: status.upload_payload_rate,
          downloadSpeed: status.download_payload_rate,
          eta: status.eta,
          numPeers: status.num_peers,
          numSeeds: status.num_seeds,
          totalPeers: status.total_peers,
          totalSeeds: status.total_seeds,
          totalWanted: status.total_wanted,
          totalUploaded: status.total_uploaded,
          totalDownloaded: status.total_done,
          tracker: status.tracker,
          trackerHost: status.tracker_host,
          trackerStatus: status.tracker_status,
          files,
        };
      } catch (err) {
        status = null;
      }
      return status;
    },
    user: torrent => torrent.$relatedQuery('user'),
    server: torrent => torrent.$relatedQuery('server'),
  },
  BigInt,
  JSON: GraphQLJSON,
};

module.exports = resolvers;
