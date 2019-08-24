import { Deluge } from '@ctrl/deluge';
import { Torrent } from '../entities/Torrent';
import { File } from '../entities/File';

const dev = process.env.NODE_ENV !== 'production';

const transformFiles = (files: any, prefix: string, name?: string): File => {
  if (files.type === 'file') {
    return {
      name: name || 'Unknown',
      type: files.type,
      url: prefix + encodeURI(files.path),
      progress: files.progress,
    };
  }
  const nameOrFirstKey = name || Object.keys(files.contents)[0];
  if (!name) {
    // tslint:disable-next-line
    files = files.contents[nameOrFirstKey];
  }
  const contents = files.contents;
  return {
    name: nameOrFirstKey,
    type: files.type,
    url: prefix + encodeURI(files.path || nameOrFirstKey),
    progress: files.progress,
    children: contents && Object.keys(contents).map(key => transformFiles(contents[key], prefix, key)),
  };
};

export const mapDelugeToTorrent = async (torrent: Torrent): Promise<Torrent | null> => {
  const server = await torrent.server;
  const prefix = dev ? 'http://localhost:3001/files/' : `https://${server.id}.torrentql.com/`;
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
  torrent.files = transformFiles(files.result, prefix);
  return torrent;
};
