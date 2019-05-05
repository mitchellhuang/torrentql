const _ = require('lodash');
const uuid = require('uuid/v4');
const { Deluge } = require('@ctrl/deluge');
const parseTorrent = require('parse-torrent');
const Torrent = require('../models/Torrent');
const Server = require('../models/Server');

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
    hash,
    type,
    data,
    status: 'active',
    server_id: server.id,
    user_id: context.user.id,
  });
};

module.exports = addTorrent;
