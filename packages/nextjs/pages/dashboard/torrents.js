import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';
import Torrent from '../../components/Torrent';
import { ME_QUERY } from '../../apollo/queries';

const TorrentsWithData = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    // pollInterval: 2000,
  });
  if (loading || !process.browser) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div>
        {JSON.stringify(error)}
      </div>
    );
  }
  if (!data.me.torrents.length) {
    return (
      <div>
        No torrents.
      </div>
    );
  }
  return (
    <div>
      {data.me.torrents.map(torrent => <Torrent key={torrent.id} torrent={torrent} />)}
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
