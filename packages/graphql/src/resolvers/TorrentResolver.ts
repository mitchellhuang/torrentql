import _ from 'lodash';
import { Repository, getConnection } from 'typeorm';
import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Args,
  Field,
  ArgsType,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Validator, IsUUID, IsNotEmpty } from 'class-validator';
import { Deluge } from '@ctrl/deluge';
import parseTorrent from 'parse-torrent';
import axios from 'axios';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { Server } from '@torrentql/common/dist/entities/Server';
import { Context } from '../lib/context';
import { Authorized, Enabled } from '../lib/decorators';

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
  @IsNotEmpty()
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

const serverSelector = async (region: Server['region']) => {
  const connection = await getConnection();
  return connection.transaction<Server | undefined>(async (transaction) => {
    const servers = await transaction
      .getRepository(Server)
      .find({
        where: {
          enabled: true,
          region,
        },
        order: {
          id: 'ASC',
        },
      });
    if (servers.length === 0) {
      return undefined;
    }
    if (servers.length === 1) {
      return servers[0];
    }
    const idx = _.findIndex(servers, { next: true });
    if (idx === -1) {
      await transaction
        .getRepository(Server)
        .update({ id: 2 }, { next: true });
      return servers[0];
    }
    await transaction
      .getRepository(Server)
      .update({ id: servers[idx].id }, { next: false });
    await transaction
      .getRepository(Server)
      .update({ id: servers[idx + 1] ? servers[idx + 1].id : 1 }, { next: true });
    return servers[idx];
  });
};

@Resolver(of => Torrent)
export class TorrentResolver {
  @InjectRepository(Torrent)
  private torrentRepository: Repository<Torrent>;

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
        active: true,
      },
    });
    let torrentsDeluge = await Promise.all(torrents.map(torrent => torrent.injectDeluge()));
    torrentsDeluge = torrentsDeluge.filter(v => v);
    return torrentsDeluge;
  }

  @Authorized()
  @Enabled()
  @Mutation(returns => Torrent)
  async addTorrent(@Args() { data }: AddTorrentInput, @Ctx() ctx: Context) {
    const server = await serverSelector('eu-west-1');
    if (!server) {
      throw new Error('No server available.');
    }
    const deluge = new Deluge({
      baseUrl: server.delugeUrl,
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
    torrent.active = true;
    torrent.hash = hash;
    torrent.type = type;
    torrent.data = data;
    torrent.server = server;
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
      active: true,
    });
    if (activeHashes.length > 1) {
      torrent.active = false;
      await this.torrentRepository.save(torrent);
    } else if (activeHashes.length === 1) {
      const deluge = await torrent.deluge();
      await deluge.removeTorrent(torrent.hash, true);
      torrent.active = false;
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
  @Enabled()
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
