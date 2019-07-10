import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY } from '../apollo/queries';
import ToolBar from "../components/ToolBar";

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

const Fieldset = ({ title, content, className = '' }) => (
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
);

const SelectedTorrentInfo = ({ torrent, onClose }) => {
  return (
    <div>
      <div className="selected-torrent-info">
        <div className="header">
          <div className="torrent-name"><b>Currently Selected: </b>{torrent.name}</div>
          <img src={closeIcon} alt="close" id="close-icon" onClick={onClose} />
        </div>
        <div className="col">
          <div className="row">
            <div className="cell">
              <Fieldset title="Ratio: " content={torrent.ratio} />
            </div>
            <div className="cell">
              <Fieldset title="ETA: " content={torrent.eta} /></div>
            <div className="cell"><Fieldset title="Hash: " content={torrent.hash} />
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <Fieldset title="Tracker: " content={torrent.tracker} />
            </div>
            <div className="cell">
              <Fieldset title="Tracker Host: " content={torrent.trackerHost} />
            </div>
            <div className="cell">
              <Fieldset title="Tracker Status: " content={torrent.trackerStatus} />
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <Fieldset title="Total Downloaded: " content={torrent.totalDownloaded} />
            </div>
            <div className="cell">
              <Fieldset title="Total Wanted: " content={torrent.totalWanted} />
            </div>
            <div className="cell">
              <Fieldset title="Total Uploaded: " content={torrent.totalUploaded} />
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <Fieldset title="Server Id: " content={torrent.server.id} />
            </div>
            <div className="cell">
              <Fieldset title="Server Region: " content={torrent.server.region} />
            </div>
            <div className="cell" />
          </div>
        </div>
      </div>
      <style jsx>{`
      .selected-torrent-info {
        background-color: white;
        box-shadow: 0px 0px 15px rgba(0,0,0,.2);
        height: 195px;
      }
      .torrent-name {
        color: white;
        font-size: 14pt;
        align-self: center;
        margin: 5px;
        padding: 5px;
      }
      #close-icon {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
      .header {
        width: 100%;
        background-color: var(--primary);
        display: flex;
        border-radius: 6px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
    `}</style>
    </div>
  );
};

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
