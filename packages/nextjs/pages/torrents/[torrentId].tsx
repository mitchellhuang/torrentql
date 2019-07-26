import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';
import { useQuery } from 'react-apollo-hooks';
import withAuth from '../../lib/withAuth';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';
import Card from '../../components/Card';
// const PrettyPrintJson = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
// <PrettyPrintJson data={torrent} />
const TorrentInfo = ({ torrent }) =>  (
  <div>
    <div className="content">
      <div className="box">
        <span className="label">ID: </span>
        {torrent.id}
      </div>
      <div className="box">
        <span className="label">Hash: </span>
        {torrent.hash}
      </div>
      <div className="box">
        <span className="label">State: </span>
        {torrent.state}
      </div>
    </div>
    <div className="content">
      <div className="box">
        <span className="label">Progress: </span>
        {torrent.progress}
      </div>
      <div className="box">
        <span className="label">Ratio: </span>
        {torrent.ratio}
      </div>
      <div className="box">
        <span className="label">Upload Speed: </span>
        {torrent.uploadSpeed}
      </div>
    </div>
    <div className="content">
      <div className="box">
        <span className="label">Download Speed: </span>
        {torrent.downloadSpeed}
      </div>
      <div className="box">
        <span className="label">Eta: </span>
        {torrent.eta}
      </div>
      <div className="box">
        <span className="label">Number of Peers: </span>
        {torrent.numPeers}
      </div>
    </div>
    <div className="content">
      <div className="box">
        <span className="label">Number of Seeds: </span>
        {torrent.numSeeds}
      </div>
      <div className="box">
        <span className="label">Total Peers: </span>
        {torrent.totalPeers}
      </div>
      <div className="box">
        <span className="label">Total Seeds: </span>
        {torrent.totalSeeds}
      </div>
    </div>
    <div className="content">
      <div className="box">
        <span className="label">Total Wanted: </span>
        {torrent.totalWanted}
      </div>
      <div className="box">
        <span className="label">Total Downloaded: </span>
        {torrent.totalDownloaded}
      </div>
      <div className="box">
        <span className="label">Tracker: </span>
        {torrent.tracker}
      </div>
    </div>
    <div className="content">
      <div className="box">
        <span className="label">Tracker Host: </span>
        {torrent.trackerHost}
      </div>
      <div className="box">
        <span className="label">Tracker Status: </span>
        {torrent.trackerStatus}
      </div>
      <div className="box">
        <span className="label">Total Uploaded: </span>
        {torrent.totalUploaded}
      </div>
    </div>
    <style jsx>{`
       .label {
         font-weight: bold;
       }
       .box {
         margin-bottom: 5px;
         flex: 1;
       }
       .content {
         display: flex;
         flex-direction: row;
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
      <Link href="/torrents">
        <a>
          <ArrowLeft/>
        </a>
      </Link>
    </div>
    <Card className="mb-3">
      <h3>{torrent.name}</h3>
    </Card>
      <Card title="Info" className="mb-3" >
        <div className="info">
          <TorrentInfo torrent={torrent}/>
        </div>
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
