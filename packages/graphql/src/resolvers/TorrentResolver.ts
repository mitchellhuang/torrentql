import { Repository } from 'typeorm';
import { Resolver, ResolverInterface, FieldResolver, Root, Mutation, Ctx, Arg } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Deluge } from '@ctrl/deluge';
import parseTorrent from 'parse-torrent';
import _ from 'lodash';
import { Context } from '../lib/context';
import { Torrent } from '../entities/Torrent';
import { Server } from '../entities/Server';
import { User } from '../entities/User';

@Resolver(Torrent)
export class TorrentResolver implements ResolverInterface<Torrent> {
  constructor(
    @InjectRepository(Torrent) private readonly torrentRepository: Repository<Torrent>,
    @InjectRepository(Server) private readonly serverRepository: Repository<Server>,
  ) {}

  @Mutation(returns => Torrent)
  async addTorrent(
    @Arg('data') data: string,
    @Ctx() ctx: Context,
  ): Promise<Torrent> {
    const servers = await this.serverRepository.find();
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
    user.id = ctx.user.id;
    const torrent = new Torrent();
    torrent.is_active = true;
    torrent.hash = hash;
    torrent.type = type;
    torrent.data = data;
    torrent.server = Promise.resolve(server);
    torrent.user = Promise.resolve(user);
    return this.torrentRepository.save(torrent);
  }

  @Mutation(returns => Boolean)
  async deleteTorrent(
    @Arg('id') id: string,
  ): Promise<Boolean> {
    const torrent = await this.torrentRepository.findOne(id);
    if (!torrent) {
      throw new Error('Torrent not found.');
    }
    const activeHashes = await this.torrentRepository.find({
      hash: torrent.hash,
      is_active: true,
    });
    if (activeHashes.length > 1) {
      torrent.is_active = false;
      await this.torrentRepository.save(torrent);
    } else if (activeHashes.length === 1) {
      const server = await torrent.server;
      const deluge = new Deluge({
        baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
        password: 'deluge',
        timeout: 1000,
      });
      await deluge.removeTorrent(torrent.hash, true);
      torrent.is_active = false;
      await this.torrentRepository.save(torrent);
    }
    return true;
  }

  @FieldResolver()
  async status(@Root() torrent: Torrent) {
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
    } catch (err) {
      return null;
    }
    return {
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
  }
}
