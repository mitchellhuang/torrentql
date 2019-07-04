import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY } from '../apollo/queries';

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

const Fieldset = ({title, content, className}) => (
  <div className={className}>
    <span className="title">
      {title}
    </span>
    <span className="content">
      {content}
    </span>
    <style jsx>{`
      .title {
        font-weight: bold;
      }
    `}</style>
  </div>
)

const SelectedTorrentInfo = ({torrent}) => (
  <div>
    <div className="selected-torrent-info">
      <div className="torrent-name">{torrent.name}</div>
      <div className="col">
        <div className="row">
          <div className="cell"><Fieldset title="Ratio: " content={torrent.ratio} /></div>
          <div className="cell"><Fieldset title="ETA: " content={torrent.eta} /></div>
          <div className="cell"><Fieldset title="Hash: " content={torrent.hash} /></div>
        </div>
        <div className="row">
          <div className="cell"><Fieldset title="Tracker: " content={torrent.tracker} /></div>
          <div className="cell"><Fieldset title="Tracker Host: " content={torrent.trackerHost} /></div>
          <div className="cell"><Fieldset title="Tracker Status: " content={torrent.trackerStatus} /></div>
        </div>
        <div className="row">
          <div className="cell"><Fieldset title="Total Downloaded: " content={torrent.totalDownloaded} /></div>
          <div className="cell"><Fieldset title="Total Wanted: " content={torrent.totalWanted} /></div>
          <div className="cell"><Fieldset title="Total Uploaded: " content={torrent.totalUploaded} /></div>
        </div>
        <div className="row">
          <div className="cell"><Fieldset title="Server Id: " content={torrent.server.id} /></div>
          <div className="cell"><Fieldset title="Server Region: " content={torrent.server.region} /></div>
          <div className="cell"></div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .torrent-name {
        background-color: var(--primary);
        color: white;
        font-size: 14pt;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
        padding: 5px;
      }
      .row {
        display: flex;
        flex-direction: row;
      }
      .row:nth-child(even) {
        background-color: var(--lightGray);
      }
      .cell:first-child {
        border-right: 0;
      }
      .cell:nth-child(2) {
        margin-left: -20px;
      }
      .cell: last-child {
        border-left: 0;
      }
      .cell {
        padding: 10px;
        flex: 1;
      }
      .selected-torrent-info {
        background-color: white;
        width: 100vw;
        box-shadow: 0px 0px 15px rgba(0,0,0,.2);
        position: fixed;
        height: 200px;
        bottom: 0;
        left: 0;
      }
    `}</style>
  </div>
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
      {'id' in selected && <SelectedTorrentInfo torrent={selected} />}
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
