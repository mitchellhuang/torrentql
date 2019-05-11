import _ from 'lodash';
import uuid from 'uuid/v4';
import { Deluge } from '@ctrl/deluge';
import parseTorrent from 'parse-torrent';
import Torrent from '../models/Torrent';
import Server from '../models/Server';

const addTorrent = async (parent, { data }, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  const servers = await Server.query();
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
  return Torrent.query().insert({
    id: uuid(),
    is_active: true,
    hash,
    type,
    data,
    server_id: server.id,
    user_id: context.user.id,
  });
};

export default addTorrent;
