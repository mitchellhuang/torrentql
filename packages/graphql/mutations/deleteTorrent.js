const { Deluge } = require('@ctrl/deluge');
const Torrent = require('../models/Torrent');

const deleteTorrent = async (parent, { torrentId }, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  const torrent = await Torrent.query().findById(torrentId);
  const activeHashes = await Torrent.query().where({
    hash: torrent.hash,
    is_active: true,
  });
  if (activeHashes.length > 1) {
    await torrent.patch({
      is_active: false,
    });
  } else if (activeHashes.length === 1) {
    const server = await torrent.$relatedQuery('server');
    const deluge = new Deluge({
      baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
      password: 'deluge',
      timeout: 1000,
    });
    await deluge.removeTorrent(torrent.hash, true);
    await torrent.patch({
      is_active: false,
    });
  }
  return true;
};

module.exports = deleteTorrent;
