import { Deluge } from '@ctrl/deluge';
import { Torrent } from '../entities/Torrent';

const directoryDiscover = (hostname, dictionary, name = '') => {
  const url = `https://${hostname}.torrentql.com`;
  if (!dictionary || !dictionary.contents) {
    // console.log('BASE_CASE', dictionary);
    return {
      ...dictionary,
      url: `${url}/${encodeURI(dictionary.path)}`,
    };
  }
  // console.log('DICTIONARY', dictionary);
  if (dictionary[name] && dictionary[name].type === 'file') {
    console.log('FILE', dictionary[name]);
    return {
      ...dictionary,
      url: `${url}/${dictionary[name].path}`,
    };
  }
  const fileLevel = dictionary.contents;
  return Object.keys(fileLevel).map((key) => {
    // return `${hostName}/${fileLevel[key].path}`;
    directoryDiscover(hostname, fileLevel[key], key);
    return {
      ...fileLevel[key],
      url,
    };
  });
};

export const mapDelugeToTorrent = async (torrent: Torrent): Promise<Torrent | null> => {
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
  } catch (err) {
    return null;
  }
  torrent.name = status.result.name;
  torrent.state = status.result.state.toLowerCase();
  torrent.progress = status.result.progress;
  torrent.ratio = status.result.ratio;
  torrent.totalSize = status.result.total_size;
  torrent.uploadSpeed = status.result.upload_payload_rate;
  torrent.downloadSpeed = status.result.download_payload_rate;
  torrent.eta = status.result.eta;
  torrent.numPeers = status.result.num_peers;
  torrent.numSeeds = status.result.num_seeds;
  torrent.totalPeers = status.result.total_peers;
  torrent.totalSeeds = status.result.total_seeds;
  torrent.totalWanted = status.result.total_wanted;
  torrent.totalUploaded = status.result.total_uploaded;
  torrent.totalDownloaded = status.result.total_done;
  torrent.tracker = status.result.tracker;
  torrent.trackerHost = status.result.tracker_host;
  torrent.trackerStatus = status.result.tracker_status;
  // console.dir(files.result, { depth: null });
  console.dir(directoryDiscover(server.id, files.result), { depth: null });
  torrent.files = files.result.contents ;
  // console.log(torrent.files);
  return torrent;
};
