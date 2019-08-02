import React from 'react';
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
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  const { data: { getDashboard } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  if (!data.me.torrents.length) {
    return (
      <>
        <ToolBar />
        <Unstyled message="No torrents." />
      </>
    );
  }
  let torrents = data.me.torrents;
  let searchFilter = getDashboard.searchFilter;
  if (searchFilter) {
    searchFilter = searchFilter.toLowerCase();
    torrents = torrents.filter(torrent => torrent.name.toLowerCase().includes(searchFilter));
  }
  if (getDashboard.statusFilter !== torrentStatus.ALL) {
    torrents = torrents.filter(torrent => torrent.state === getDashboard.statusFilter);
  }
  return (
    <div className="torrents">
      <TorrentsSidebar />
      <div className="main">
        <ToolBar />
        <TorrentTableHeader />
        {torrents.map(torrent => (
          <Torrent
            torrent={torrent}
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
