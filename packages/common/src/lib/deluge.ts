import { Deluge } from '@ctrl/deluge';
import { Torrent } from '../entities/Torrent';

const directoryDiscover = (hostname, dictionary, name) => {
  const hostName = `${hostname}.torrentql.com`;
  if (!dictionary || !dictionary.contents) {
    return;
  }
  if (fileLevel[key].type === 'file') {
    console.log(`File: ${hostName}/${fileLevel[key].path}`);
    return fileLevel[key];
  }
  // console.log('HOSTNAME: ', hostName);
  // console.log('FILE STRUCTURE: ', fileDirectory.contents);
  const fileLevel = dictionary.contents;
  Object.keys(fileLevel).forEach((key) => {
    // if file we return link otherwise
    // recursively step through directory

    // console.log(fileLevel[key]);
    console.log(`Directory: ${hostName}/${fileLevel[key].path}`);
    directoryDiscover(hostname, fileLevel[key], name);
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
  const hostNamePath = 'https://gra001.torrentql.com';
  const ngnixFilePath = `${hostNamePath}/${encodeURIComponent('deez-nuts')}`;
  // console.log(server.id);
  const torrentFiles =  directoryDiscover(server.id, files.result);
  // console.log(files.result);
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
  torrent.files = files.result;
  return torrent;
};
