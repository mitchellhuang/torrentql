import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import Main from '../../layouts/Main';
import Button from '../../components/Button';
import FileExplorer from '../../components/FileExplorer';

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
    <Main title={torrent.name}>
      <div className="wrapper">
        <Button href="/torrents" white className="back-button" animate>Back to torrents</Button>
        <h2 className="name">{torrent.name}</h2>
        <h3 className="mb-2">Files</h3>
        <div className="card">
          <FileExplorer torrent={torrent} />
        </div>
        <br/>
        <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .wrapper :global(.back-button) {
          width: 200px;
          margin-bottom: 10px;
        }
        .title {
          font-weight: bold;
        }
      `}</style>
      </div>
    </Main>
  );
};

export default withAuth(Torrent);
