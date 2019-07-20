import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY } from '../apollo/queries';
import ToolBar from '../components/ToolBar';

export const Unstyled = ({ message }) => (
  <div>
    {message}
  </div>
);

const TorrentTableHeader = () => (
  <TRow header>
    <TCell flex={5}>Name</TCell>
    <TCell flex={2}>Progress</TCell>
    <TCell flex={1}>Down Speed</TCell>
    <TCell flex={1}>Up Speed</TCell>
    <TCell flex={1}>Peers</TCell>
    <TCell flex={1}>Seeds</TCell>
  </TRow>
);

const TorrentsWithData = () => {
  const [selected, selectTorrent] = useState<String[]>([]);
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
    return (
      <>
        <ToolBar selected={selected} />
        <Unstyled message="No torrents."/>
      </>
    );
  }
  return (
    <div className="torrents">
      <ToolBar selected={selected} />
      <TorrentTableHeader />
      {data.me.torrents.map(torrent => (
        <Torrent
          torrent={torrent}
          selected={selected.includes(torrent.id)}
          onClick={() => {
            if (!selected.includes(torrent.id)) {
              selectTorrent(selected.concat([torrent.id]));
            } else {
              selectTorrent(selected.filter(id => id !== torrent.id));
            }
          }}
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
