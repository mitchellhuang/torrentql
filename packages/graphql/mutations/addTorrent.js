const uuid = require('uuid/v4');
const Torrent = require('../models/Torrent');

const addTorrent = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  const { magnet, file } = args;
  const torrent = await Torrent.query().insert({
    id: uuid(),
    status: 'active',
    file,
    magnet,
    server_id: 'gra001',
    user_id: context.user.id,
  });
  return torrent;
};

module.exports = addTorrent;
