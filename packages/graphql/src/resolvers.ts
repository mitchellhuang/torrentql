import BigInt from 'graphql-bigint';
import { GraphQLJSON } from 'graphql-type-json';
import { Deluge } from '@ctrl/deluge';
import { GraphQLFieldResolver } from 'graphql';
import { Context } from './lib/context';
import { me } from './queries/me';
import { login } from './mutations/login';
import { createUser } from './mutations/createUser';
import { deleteUser } from './mutations/deleteUser';
import { addTorrent } from './mutations/addTorrent';
import { deleteTorrent } from './mutations/deleteTorrent';
import { User } from './entity/User';
import { Torrent } from './entity/Torrent';

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    createUser,
    deleteUser,
    addTorrent,
    deleteTorrent,
  },
  User: {
    torrents: (user: User) => user.torrents,
  },
  Torrent: {
    status: async (torrent: Torrent) => {
      if (!torrent.is_active) {
        return null;
      }
      const server = await torrent.server;
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
    user: (torrent: Torrent) => torrent.user,
    server: (torrent: Torrent) => torrent.server,
  },
  BigInt,
  JSON: GraphQLJSON,
};

export default resolvers;
