import React from 'react';
import { withRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';

const PrettyPrintJson = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const TorrentInfo = ({ torrent }) =>  (
  <div>
    <div><span className="label">ID: </span>
      {torrent.id}
    </div>
    <div><span className="label">Hash: </span>
      {torrent.hash}
    </div>
    <div><span className="label">Name: </span>
      {torrent.name}
    </div>
    <div><span className="label">State: </span>
      {torrent.state}
    </div>
    <div><span className="label">Progress: </span>
      {torrent.progress}
    </div>


    <div><span className="label">Ratio: </span>
      {torrent.ratio}
    </div>
    <div><span className="label">Upload Speed: </span>
      {torrent.uploadSpeed}
    </div>
    <div><span className="label">Download Speed: </span>
      {torrent.downloadSpeed}
    </div>
    <div><span className="label">Eta: </span>
      {torrent.eta}
    </div>
    <div><span className="label">Number of Peers: </span>
      {torrent.numPeers}
    </div>




    <div><span className="label">Number of Seeds: </span>
      {torrent.numSeeds}
    </div>
    <div><span className="label">Download Speed: </span>
      {torrent.downloadSpeed}
    </div>
    <div><span className="label">Eta: </span>
      {torrent.eta}
    </div>
    <div><span className="label">Number of Peers: </span>
      {torrent.numPeers}
    </div>
    <div><span className="label">Number of Seeds: </span>
      {torrent.numSeeds}
    </div>


    <div><span className="label">Total Peers: </span>
      {torrent.numSeeds}
    </div>
    <div><span className="label">Download Speed: </span>
      {torrent.downloadSpeed}
    </div>
    <div><span className="label">Eta: </span>
      {torrent.eta}
    </div>
    <div><span className="label">Number of Peers: </span>
      {torrent.numPeers}
    </div>
    <div><span className="label">Number of Seeds: </span>
      {torrent.numSeeds}
    </div>


    <style jsx>{`
       .label {
         background-color: white;
         font-weight: bold;
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
      <h2 className="mb-2">{torrent.name}</h2>
      <h3 className="mb-2">Info</h3>
      <div className="info">
        <TorrentInfo torrent={torrent}/>
        <PrettyPrintJson data={torrent} />
      </div>
      <h3 className="mb-2">Files</h3>
      <div className="files">
        <FileExplorer torrent={torrent}/>
      </div>
      <br/>
      {torrent.selectedFile && <MediaPlayer selectedFile={torrent.selectedFile}/>}
      <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .info :global(pre) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

const Torrent = ({
  router
}) => {
  const id = router.query.torrentId;
  return (
    <Dashboard title={id} noFooter>
      <TorrentWithData id={id}/>
    </Dashboard>
  );
};

export default withAuth(withRouter(Torrent));
