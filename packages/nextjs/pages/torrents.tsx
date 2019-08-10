import React from 'react';
import { Square } from 'react-feather';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY, GET_DASHBOARD_QUERY } from '../apollo/queries';
import ToolBar from '../components/ToolBar';
import TorrentsSidebar from '../components/TorrentsSidebar';
import { torrentStatus } from '../lib/constants';
import { UPDATE_SELECTED_TORRENTS_MUTATION } from '../apollo/mutations';
import InfoPopup from '../components/InfoPopup';

export const Unstyled = ({ message }) => (
  <div>
    {message}
  </div>
);

const TorrentTableHeader = ({ torrents, selected }) => {
  const [updateSelectedTorrents] = useMutation(UPDATE_SELECTED_TORRENTS_MUTATION);
  const allSelected = torrents.length === selected.length && torrents.length > 0;
  const handleSelection = () => {
    const selectedTorrents = allSelected ? [] : torrents.map(torrent => torrent.id);
    return updateSelectedTorrents({ variables: { selectedTorrents } });
  };
  return (
    <TRow header>
      <div className="checkbox" onClick={() => handleSelection()}>
        <Square size={20} className="icon-square" />
      </div>
      <TCell flex={5}>Name</TCell>
      <TCell flex={2}>Progress</TCell>
      <TCell flex={1}>Down Speed</TCell>
      <TCell flex={1}>Up Speed</TCell>
      <TCell flex={1}>Peers</TCell>
      <TCell flex={1}>Seeds</TCell>
      <style jsx>{`
      .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        padding: 0 10px;
      }
    `}</style>
    </TRow>
  );
};

const TorrentsWithData = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  const { data: { getDashboard } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  let torrents = [];
  let content;
  let focusedTorrent;
  if (loading || !process.browser) {
    content = <Unstyled message="Loading..." />;
  } else if (error) {
    content = <Unstyled message={JSON.stringify(error)} />;
  } else if (!data.me.torrents.length) {
    content = (
      <>
        <Unstyled message="No torrents." />
      </>
    );
  } else {
    torrents = data.me.torrents;
    let searchFilter = getDashboard.searchFilter;
    if (searchFilter) {
      searchFilter = searchFilter.toLowerCase();
      torrents = torrents.filter(torrent => torrent.name.toLowerCase().includes(searchFilter));
    }
    if (getDashboard.statusFilter !== torrentStatus.ALL) {
      torrents = torrents.filter(torrent => torrent.state === getDashboard.statusFilter);
    }
    content = torrents.map(torrent => (
      <Torrent
        torrent={torrent}
        key={torrent.id}
      />
    ));
    focusedTorrent = torrents.filter(torrent => torrent.id === getDashboard.focusedTorrent);
    focusedTorrent = focusedTorrent.length > 0 && focusedTorrent[0];
  }
  return (
    <div className="torrents">
      <TorrentsSidebar />
      <div className="info-main">
        <div className="main">
          <ToolBar />
          <TorrentTableHeader torrents={torrents} selected={getDashboard.selectedTorrents} />
          {content}
        </div>
        {focusedTorrent && <InfoPopup torrent={focusedTorrent} />}
      </div>
      <style jsx>{`
        .torrents {
          display: flex;
          min-width: 1024px;
          flex-direction: row;
        }
        .info-panel {
          display: flex;

        }
        .info-main {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .main {
          flex: 5;
        }
      `}</style>
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter noWrap noPad>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
