import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY } from '../apollo/queries';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import deleteIcon from '../static/delete.svg';

const Unstyled = ({ message }) => (
  <div>
    {message}
  </div>
);

const TorrentTableHeader = () => (
  <TRow header>
    <TCell flex={5}>Name</TCell>
    <TCell flex={2}>Progress</TCell>
    <TCell flex={1}>Down Speed</TCell>
    <TCell flex={1}>Up speed</TCell>
    <TCell flex={1}>Peers</TCell>
    <TCell flex={1}>Seeds</TCell>
  </TRow>
);

const TorrentsWithData = () => {
  const [selected, selectTorrent] = useState<{ id?: string }>({});
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  if (!data.me.torrents.length) {
    return <Unstyled message="No torrents." />;
  }
  return (
    <div className="torrents">
      <TorrentTableHeader />
      {data.me.torrents.map(torrent => (
        <Torrent
          torrent={torrent}
          selected={torrent.id === selected.id}
          onClick={() => selectTorrent(torrent.id !== selected.id ? torrent : {})}
          key={torrent.id}
        />
      ))}
      <style jsx>{`
        .torrents {
          min-width: 1024px;
        }
      `}</style>
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
