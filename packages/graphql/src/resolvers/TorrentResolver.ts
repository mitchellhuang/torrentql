import _ from 'lodash';
import { Repository } from 'typeorm';
import {
  Resolver,
  Query,
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
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { Server } from '@torrentql/common/dist/entities/Server';

const validator = new Validator();

@ArgsType()
class GetTorrentInput {
  @Field()
  @IsUUID()
  id: string;
}

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

@ArgsType()
class PauseTorrentInput {
  @Field()
  @IsUUID()
  id: string;
}

@ArgsType()
class ResumeTorrentInput {
  @Field()
  @IsUUID()
  id: string;
}

@Resolver(of => Torrent)
export class TorrentResolver {
  @InjectRepository(Torrent)
  private torrentRepository: Repository<Torrent>;

  @InjectRepository(Server)
  private serverRepository: Repository<Server>;

  @Authorized()
  @Query(returns => Torrent)
  async getTorrent(@Args() { id }: GetTorrentInput, @Ctx() ctx: Context) {
    const torrent = await this.torrentRepository.findOne(id);
    if (!torrent) {
      throw new Error('Torrent not found.');
    }
    const user = await torrent.user;
    if (ctx.user.id !== user.id) {
      throw new Error('Torrent not found.');
    }
    const torrentDeluge = await torrent.injectDeluge();
    if (!torrentDeluge) {
      throw new Error('Torrent not found');
    }
    return torrentDeluge;
  }

  @Authorized()
  @Query(returns => [Torrent])
  async getTorrents(@Ctx() ctx: Context) {
    const user = ctx.user;
    const torrents = await this.torrentRepository.find({
      where: {
        user: { id: user.id },
        isActive: true,
      },
    });
    let torrentsDeluge = await Promise.all(torrents.map(torrent => torrent.injectDeluge()));
    torrentsDeluge = torrentsDeluge.filter(v => v);
    return torrentsDeluge;
  }

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
    let type: 'url' | 'magnet' | 'file';
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
    if (!hash || !type) {
      throw new Error('Could not parse torrent file.');
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
      const deluge = await torrent.deluge();
      await deluge.removeTorrent(torrent.hash, true);
      torrent.isActive = false;
      await this.torrentRepository.save(torrent);
    }
    return true;
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async pauseTorrent(@Args() { id }: PauseTorrentInput, @Ctx() ctx: Context) {
    const torrent = await this.torrentRepository.findOne(id);
    if (!torrent) {
      throw new Error('Torrent not found.');
    }
    const user = await torrent.user;
    if (user.id !== ctx.user.id) {
      throw new Error('Torrent not found.');
    }
    const deluge = await torrent.deluge();
    await deluge.pauseTorrent(torrent.hash);
    return true;
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async resumeTorrent(@Args() { id }: ResumeTorrentInput, @Ctx() ctx: Context) {
    const torrent = await this.torrentRepository.findOne(id);
    if (!torrent) {
      throw new Error('Torrent not found.');
    }
    const user = await torrent.user;
    if (user.id !== ctx.user.id) {
      throw new Error('Torrent not found.');
    }
    const deluge = await torrent.deluge();
    await deluge.resumeTorrent(torrent.hash);
    return true;
  }
}
