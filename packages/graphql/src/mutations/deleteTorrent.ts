import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { Deluge } from '@ctrl/deluge';
import { Torrent } from '../entity/Torrent';

interface DeleteTorrentArgs {
  torrentId: string;
}

export const deleteTorrent: GraphQLFieldResolver<void, Context, DeleteTorrentArgs> =
  async (parent, { torrentId }, context) => {
    if (!context.user) {
      throw new Error('You are not authenticated.');
    }
    const torrentRepository = context.connection.getRepository(Torrent);
    const torrent = await torrentRepository.findOne(torrentId);
    const activeHashes = await torrentRepository.find({
      hash: torrent.hash,
      is_active: true,
    });
    if (activeHashes.length > 1) {
      torrent.is_active = false;
      await torrentRepository.save(torrent);
    } else if (activeHashes.length === 1) {
      const server = torrent.server;
      const deluge = new Deluge({
        baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
        password: 'deluge',
        timeout: 1000,
      });
      await deluge.removeTorrent(torrent.hash, true);
      torrent.is_active = false;
      await torrentRepository.save(torrent);
    }
    return true;
  };
