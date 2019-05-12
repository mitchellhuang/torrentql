import _ from 'lodash';
import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { Deluge } from '@ctrl/deluge';
import parseTorrent from 'parse-torrent';
import { User } from '../entity/User';
import { Torrent } from '../entity/Torrent';
import { Server } from '../entity/Server';

interface AddTorrentArgs {
  data: string;
}

export const addTorrent: GraphQLFieldResolver<void, Context, AddTorrentArgs> =
  async (parent, { data }, context) => {
    if (!context.user) {
      throw new Error('You are not authenticated.');
    }
    const serverRepository = context.connection.getRepository(Server);
    const servers = await serverRepository.find();
    const server = _.sample(servers);
    if (!server) {
      throw new Error('No server available');
    }
    const deluge = new Deluge({
      baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
      password: 'deluge',
      timeout: 1000,
    });
    let hash;
    let type;
    if (data.includes('magnet')) {
      type = 'magnet';
      try {
        hash = parseTorrent(data).infoHash;
      } catch (err) {
        throw new Error('Invalid magnet link');
      }
      await deluge.addTorrentMagnet(data);
    } else {
      type = 'file';
      try {
        hash = parseTorrent(Buffer.from(data, 'base64')).infoHash;
      } catch (err) {
        throw new Error('Invalid torrent file');
      }
      await deluge.addTorrent(data);
    }
    const user = new User();
    user.id = context.user.id;
    const torrent = new Torrent();
    torrent.is_active = true;
    torrent.hash = hash;
    torrent.type = type;
    torrent.data = data;
    torrent.server = Promise.resolve(server);
    torrent.user = Promise.resolve(user);
    const torrentRepository = context.connection.getRepository(Torrent);
    return torrentRepository.save(torrent);
  };
