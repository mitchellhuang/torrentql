import _ from 'lodash';
import { Repository } from 'typeorm';
import {
  Resolver,
  ResolverInterface,
  FieldResolver,
  Root,
  Mutation,
  Ctx,
  Args,
  Field,
  ArgsType,
  Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Validator, MinLength, IsUUID } from 'class-validator';
import { Deluge } from '@ctrl/deluge';
import parseTorrent from 'parse-torrent';
import axios from 'axios';
import { Context } from '../lib/context';
import { Torrent } from '../entities/Torrent';
import { TorrentStatus } from '../entities/TorrentStatus';
import { Server } from '../entities/Server';

const validator = new Validator();

@ArgsType()
class AddTorrentInput {
  @Field()
  @MinLength(1)
  data: string;
}

@ArgsType()
class DeleteTorrentInput {
  @Field()
  @IsUUID()
  id: string;
}

@Resolver(Torrent)
export class TorrentResolver implements ResolverInterface<Torrent> {
  constructor(
    @InjectRepository(Torrent) private readonly torrentRepository: Repository<Torrent>,
    @InjectRepository(Server) private readonly serverRepository: Repository<Server>,
  ) {}

  @Authorized()
  @Mutation(returns => Torrent)
  async addTorrent(@Args() { data }: AddTorrentInput, @Ctx() ctx: Context) {
    const servers = await this.serverRepository.find();
    const server = _.sample(servers);
    if (!server) {
      throw new Error('No server available.');
    }
    const deluge = new Deluge({
      baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
      password: 'deluge',
      timeout: 1000,
    });
    let hash;
    let type;
    const isUrl = validator.isURL(data);
    if (isUrl) {
      type = 'url';
      try {
        const result = await axios.get<Buffer>(data, {
          maxContentLength: 1000 * 1000,
          responseType: 'arraybuffer',
        });
        hash = parseTorrent(result.data).infoHash;
        await deluge.addTorrent(result.data);
      } catch (err) {
        throw new Error('Invalid torrent file URL.');
      }
    } else if (data.includes('magnet')) {
      type = 'magnet';
      try {
        hash = parseTorrent(data).infoHash;
        await deluge.addTorrentMagnet(data);
      } catch (err) {
        throw new Error('Invalid magnet link.');
      }
    } else {
      type = 'file';
      try {
        hash = parseTorrent(Buffer.from(data, 'base64')).infoHash;
        await deluge.addTorrent(data);
      } catch (err) {
        throw new Error('Invalid torrent file.');
      }
    }
    const torrent = new Torrent();
    torrent.isActive = true;
    torrent.hash = hash;
    torrent.type = type;
    torrent.data = data;
    torrent.server = Promise.resolve(server);
    torrent.user = Promise.resolve(ctx.user);
    return this.torrentRepository.save(torrent);
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteTorrent(@Args() { id }: DeleteTorrentInput, @Ctx() ctx: Context) {
    const torrent = await this.torrentRepository.findOne(id);
    if (!torrent) {
      throw new Error('Torrent not found.');
    }
    const torrentUser = await torrent.user;
    if (torrentUser.id !== ctx.user.id) {
      throw new Error('Torrent not found.');
    }
    const activeHashes = await this.torrentRepository.find({
      hash: torrent.hash,
      isActive: true,
    });
    if (activeHashes.length > 1) {
      torrent.isActive = false;
      await this.torrentRepository.save(torrent);
    } else if (activeHashes.length === 1) {
      const server = await torrent.server;
      const deluge = new Deluge({
        baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
        password: 'deluge',
        timeout: 1000,
      });
      await deluge.removeTorrent(torrent.hash, true);
      torrent.isActive = false;
      await this.torrentRepository.save(torrent);
    }
    return true;
  }

  @FieldResolver()
  async status(@Root() torrent: Torrent) {
    if (!torrent.isActive) {
      return null;
    }
    const server = await torrent.server;
    const deluge = new Deluge({
      baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
      password: 'deluge',
      timeout: 1000,
    });
    try {
      const status = await deluge.getTorrentStatus(torrent.hash);
      const files = await deluge.getTorrentFiles(torrent.hash);
      const torrentStatus = new TorrentStatus();
      torrentStatus.name = status.result.name;
      torrentStatus.state = status.result.state.toLowerCase();
      torrentStatus.progress = status.result.progress;
      torrentStatus.ratio = status.result.ratio;
      torrentStatus.uploadSpeed = status.result.upload_payload_rate;
      torrentStatus.downloadSpeed = status.result.download_payload_rate;
      torrentStatus.eta = status.result.eta;
      torrentStatus.numPeers = status.result.num_peers;
      torrentStatus.numSeeds = status.result.num_seeds;
      torrentStatus.totalPeers = status.result.total_peers;
      torrentStatus.totalSeeds = status.result.total_seeds;
      torrentStatus.totalWanted = status.result.total_wanted;
      torrentStatus.totalUploaded = status.result.total_uploaded;
      torrentStatus.totalDownloaded = status.result.total_done;
      torrentStatus.tracker = status.result.tracker;
      torrentStatus.trackerHost = status.result.tracker_host;
      torrentStatus.trackerStatus = status.result.tracker_status;
      torrentStatus.files = files.result;
      return torrentStatus;
    } catch (err) {
      return null;
    }
  }
}
