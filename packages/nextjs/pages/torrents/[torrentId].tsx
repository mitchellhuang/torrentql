import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';

const Torrent = ({ id }) => {
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
    <div className="wrapper">
      <h2 className="name">{torrent.name}</h2>
      <h3 className="mb-2">Files</h3>
      <div className="card">
        <FileExplorer torrent={torrent}/>
      </div>
      <br/>
      {torrent.selectedFile && <MediaPlayer selectedFile={torrent.selectedFile}/>}
      <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

const TorrentDashboard = () => {
  const router = useRouter();
  const id = router.query.torrentId;
  return (
    <Dashboard title={id} noFooter>
      <Torrent id={id}/>
    </Dashboard>
  );
};

export default withAuth(TorrentDashboard);
