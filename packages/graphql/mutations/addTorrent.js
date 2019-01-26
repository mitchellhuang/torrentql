const uuid = require('uuid/v4');
const User = require('../models/User');
const Torrent = require('../models/Torrent');
const jwt = require('../lib/jwt');

const addTorrent = async (parent, args) => {
  const { magnet, file } = args;
  var decoded = jwt.verify(token); //need to get the token so I can attach uuid
  const torrent = await Torrent.query().insert({
    id: uuid()/*need to make unique id for torrent*/,
    magnet,
    file,
    uuid: decoded.id /*get logged in user id*/
  });
  return {
    ...torrent
  };
};

module.exports = addTorrent;
