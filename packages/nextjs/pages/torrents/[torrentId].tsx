import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';

const Torrent = () => {
  const router = useRouter();
  const { loading, data, error } = useQuery(GET_TORRENT_QUERY, {
    ssr: false,
    pollInterval: 2000,
    variables: {
      id: router.query.torrentId,
    },
  });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  const torrent = data.getTorrent;
  return (
    <Dashboard title={`torrent-${torrent.name}`} noFooter>
      <div className="wrapper">
        <h2 className="name">{torrent.name}</h2>
        <h3 className="mb-2">Files</h3>
        <div className="card">
          <FileExplorer torrent={torrent}/>
        </div>
        <br/>
        {torrent.selectedFile && <MediaPlayer selectedFile={torrent.selectedFile}/>}
      </div>
      <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .title {
          font-weight: bold;
        }
      `}</style>
    </Dashboard>
  );
};

export default withAuth(Torrent);
