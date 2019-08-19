import React from 'react';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import { withRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';
import { useQuery } from 'react-apollo-hooks';
import withAuth from '../../lib/withAuth';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';
import Card from '../../components/Card';

const Unstyled = ({ message }) => (
  <div>
    {message}
  </div>
);

const TorrentInfo = ({ torrent }) =>  (
  <div>
    <div className="content">
      <div className="column">
        <div className="box">
          <span className="label">ID</span>
          {torrent.id}
        </div>
        <div className="box">
          <span className="label">Progress</span>
          {torrent.progress}%
        </div>
        <div className="box">
          <span className="label">Download Speed</span>
          {prettyBytes(torrent.downloadSpeed)}
        </div>
        <div className="box">
          <span className="label">Number of Seeds</span>
          {torrent.numSeeds}
        </div>
        <div className="box">
          <span className="label">Total Wanted</span>
          {prettyBytes(torrent.totalWanted)}
        </div>
        <div className="box">
          <span className="label">Tracker Host</span>
          {torrent.trackerHost}
        </div>
      </div>
      <div className="column">
        <div className="box">
          <span className="label">Hash</span>
          {torrent.hash}
        </div>
        <div className="box">
          <span className="label">Ratio</span>
          {torrent.ratio.toFixed(2)}
        </div>
        <div className="box">
          <span className="label">Eta</span>
          {torrent.eta}
        </div>
        <div className="box">
          <span className="label">Total Peers</span>
          {torrent.totalPeers}
        </div>
        <div className="box">
          <span className="label">Total Downloaded</span>
          {prettyBytes(torrent.totalDownloaded)}
        </div>
        <div className="box">
          <span className="label">Tracker Status</span>
          {torrent.trackerStatus}
        </div>
      </div>
      <div className="column">
        <div className="box">
          <span className="label">State</span>
          {torrent.state}
        </div>
        <div className="box">
          <span className="label">Upload Speed</span>
          {prettyBytes(torrent.uploadSpeed)}
        </div>
        <div className="box">
          <span className="label">Number of Peers</span>
          {torrent.numPeers}
        </div>
        <div className="box">
          <span className="label">Total Seeds</span>
          {torrent.totalSeeds}
        </div>
        <div className="box">
          <span className="label">Tracker</span>
          {torrent.tracker}
        </div>
        <div className="box">
          <span className="label">Total Uploaded</span>
          {prettyBytes(torrent.totalUploaded)}
        </div>
      </div>
    </div>
    <style jsx>{`
      .label {
        font-weight: 600;
        font-weight: bold;
        margin-bottom: 2.5px;
      }
      .column {
        flex: 1;
        overflow: auto;
      }
      .box {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        word-break: break-word;
      }
      .content {
        display: flex;
        flex-direction: column;
      }
      .column:last-child .box:last-child {
        margin-bottom: 0;
      }
      @media(min-width: 768px) {
        .content {
          flex-direction: row;
        }
        .box {
          padding-right: 15px;
        }
        .box:last-child {
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
  );

const TorrentWithData = ({ id }) => {
  const { loading, data, error } = useQuery(GET_TORRENT_QUERY, {
    ssr: false,
    pollInterval: 2000,
    variables: { id },
  });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  const torrent = data.getTorrent;
  return (
    <>
    <div className="mb-2">
      <Link href="/dashboard">
        <a className="back">
          <ArrowLeft/>
          Back to Dashboard
        </a>
      </Link>
    </div>
      <Card title={torrent.name} className="mb-3" >
        <TorrentInfo torrent={torrent}/>
      </Card>
      <Card title="Files">
        <FileExplorer torrent={torrent}/>
      </Card>
      {torrent.selectedFile && <MediaPlayer selectedFile={torrent.selectedFile}/>}
      <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .info:global(pre) {
          font-size: 14px;
        }
        .back {
          display: flex;
          align-items: center;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

const Torrent = ({
  router,
}) => {
  const id = router.query.torrentId;
  return (
    <Dashboard title={id} noFooter>
      <TorrentWithData id={id}/>
    </Dashboard>
  );
};

export default withAuth(withRouter(Torrent));
