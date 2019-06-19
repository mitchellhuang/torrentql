import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';
import Torrent, { TRow, TCell } from '../../components/Torrent';
import { ME_QUERY } from '../../apollo/queries';

const NoTableText = ({ message }) => (
  <div>
    {message}
  </div>
);

const TableHeader = () => {
  const columnHeaderNames = [
    'Name', 'Progress', '⬆ Speed', '⬇ Speed', 'Peers', 'Seeds',
  ];
  return (
    <TRow className="header">
      {columnHeaderNames.map((ele) => {
        switch (ele) {
          case 'Name':
            return <TCell key={ele} className="torrent-name">{ele}</TCell>;
          case 'Progress':
            return <TCell key={ele} minWidth="170px">{ele}</TCell>;
          case '⬆ Speed':
          case '⬇ Speed':
            return <TCell key={ele} minWidth="130px">{ele}</TCell>;
          default:
            return <TCell key={ele}>{ele}</TCell>;
        }
      })}
    </TRow>
  );
};

const TorrentsWithData = () => {
  const [selectedTorrent, setSelectedTorrent] = useState({});
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  if (loading || !process.browser) {
    return <NoTableText message="Loading ..." />;
  }
  if (error) {
    return <NoTableText message={JSON.stringify(error)} />;
  }
  if (!data.me.torrents.length) {
    return <NoTableText message="No torrents." />;
  }
  return (
    <div className="torrents-table">
      <TableHeader />
      {data.me.torrents.map(tor => (
        <Torrent
          torrent={tor}
          selected={tor.id === selectedTorrent.id}
          onTorrentSelected={() => setSelectedTorrent(tor.id !== selectedTorrent.id ? tor : {})}
        />
      ))}
      <style jsx>{`
        .torrents-table {
          background-color: var(--lightGray);
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
