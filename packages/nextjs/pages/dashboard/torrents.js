import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../../layouts/Dashboard';
import Torrent from '../../components/Torrent';
import { ME_QUERY } from '../../apollo/queries';

const TorrentsView = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  if (loading) {
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
  if (!data) {
    return null;
  }
  const { torrents } = data.me;
  if (!torrents.length) {
    return (
      <div>
        No torrents.
      </div>
    );
  }
  return (
    <div>
      {torrents.map(torrent => <Torrent key={torrent.id} torrent={torrent} />)}
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter>
    <TorrentsView />
  </Dashboard>
);

export default Torrents;
