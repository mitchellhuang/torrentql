import { Deluge } from '@ctrl/deluge';

export const mapDelugeToTorrent = async (torrent) => {
  const server = await torrent.server;
  const deluge = new Deluge({
    baseUrl: `${server.protocol}://${server.host}:${server.port}/`,
    password: 'deluge',
    timeout: 1000,
  });
  const status = await deluge.getTorrentStatus(torrent.hash);
  const files = await deluge.getTorrentFiles(torrent.hash);
  torrent.name = status.result.name;
  torrent.state = status.result.state.toLowerCase();
  torrent.progress = status.result.progress;
  torrent.ratio = status.result.ratio;
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
