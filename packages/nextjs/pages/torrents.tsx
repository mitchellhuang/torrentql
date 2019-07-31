import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY, GET_DASHBOARD_QUERY } from '../apollo/queries';
import ToolBar from '../components/ToolBar';
import TorrentsSidebar from '../components/TorrentsSidebar';
import { torrentStatus } from '../lib/constants';

export const Unstyled = ({ message }) => (
  <div>
    {message}
  </div>
);

const TorrentTableHeader = () => (
  <TRow header>
    <div />
    <TCell flex={5}>Name</TCell>
    <TCell flex={2}>Progress</TCell>
    <TCell flex={1}>Down Speed</TCell>
    <TCell flex={1}>Up Speed</TCell>
    <TCell flex={1}>Peers</TCell>
    <TCell flex={1}>Seeds</TCell>
    <style jsx>{`
      div {
        margin-left: 50px;
      }
    `}</style>
  </TRow>
);

const TorrentsWithData = () => {
  const [selected, selectTorrent] = useState<String[]>([]);
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  let { data: { getDashboard: { searchFilter, statusFilter } } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
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
        <Unstyled message="No torrents." />
      </>
    );
  }
  let torrents = data.me.torrents;
  if (searchFilter) {
    searchFilter = searchFilter.toLowerCase();
    torrents = torrents.filter(torrent => torrent.name.toLowerCase().includes(searchFilter));
  }
  if (statusFilter !== torrentStatus.ALL) {
    torrents = torrents.filter(torrent => torrent.state === statusFilter);
  }
  return (
    <div className="torrents">
      <TorrentsSidebar/>
      <div className="main">
        <ToolBar selected={selected} />
        <TorrentTableHeader />
        {torrents.map(torrent => (
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
      </div>
      <style jsx>{`
        .torrents {
          display: flex;
          min-width: 1024px;
        }
        .main {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter noWrapPadding>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
