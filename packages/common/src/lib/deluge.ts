import { Deluge } from '@ctrl/deluge';
import { Torrent } from '../entities/Torrent';

const directoryDiscover = (hostname, dictionary, name = '') => {
  const url = `https://${hostname}.torrentql.com`;
  dictionary.url = url;
  if (!dictionary) {
    return {
      ...dictionary,
      url: `${url}/`,
      name: 'Untitled',
    };
  }
  if (dictionary.type === 'file') {
    const filePath = dictionary.path.split('/');
    return {
      ...dictionary,
      url: `${url}/${encodeURI(dictionary.path)}`,
      name: filePath[filePath.length - 1],
    };
  }
  const fileLevel = dictionary.contents;
  if (dictionary.path) {
    const filePath = dictionary.path.split('/');
    dictionary.url = `${url}/${encodeURI(dictionary.path)}`;
    if (filePath.length > 1) {
      dictionary.name = filePath[filePath.length - 1];
    } else {
      dictionary.name = filePath[0];
    }
  }
  dictionary.name = 'Untitled';
  dictionary.contents = Object.keys(fileLevel).map((key) => {
    return directoryDiscover(hostname, fileLevel[key], key);
  });
  return dictionary;
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
  files.result = directoryDiscover(server.id, files.result);
  torrent.files = files.result ;
  return torrent;
};
