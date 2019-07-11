
import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import Main from '../../layouts/Main';
import Link from 'next/link';

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
        <Link href="/torrents">
          <a>Back to torrents</a>
        </Link>
        <h2 className="name">{torrent.name}</h2>
        {Object.keys(torrent).map(key => (
          <div key={key}>
            <span className="title">{key}: </span>
            <span>{JSON.stringify(torrent[key])}</span>
          </div>
        ))}
        <style jsx>{`
        .torrent {
          padding: 15px;
        }
        .name {
          margin-bottom: 15px;
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
