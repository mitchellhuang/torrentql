import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Torrent, { TRow, TCell } from '../components/Torrent';
import { ME_QUERY } from '../apollo/queries';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import ToolBar from "../components/ToolBar";
import closeIcon from "../static/x-circle.svg";

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

const SelectedTorrentInfo = ({ torrent }) => {
  const deleteTorrent = useMutation(DELETE_TORRENT_MUTATION);
  const handleDeleteTorrent = id => deleteTorrent({
    variables: {
      id,
    },
    update: (store) => {
      const data = store.readQuery({ query: ME_QUERY });
      data.me.torrents = data.me.torrents.filter(torrent => torrent.id !== id);
      store.writeQuery({
        query: ME_QUERY,
        data,
      });
    },
  });
  return (
    <div>
      <div className="selected-torrent-info">
        <div className="header">
          <div className="torrent-name"><b>Currently Selected: </b>{torrent.name}</div>
          <img src={deleteIcon} alt="delete" onClick={() => handleDeleteTorrent(torrent.id)} />
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
      .torrent-name {
        color: white;
        font-size: 14pt;
        align-self: center;
        margin: 5px;
        padding: 5px;
      }
      img {
        height: 35px;
        margin: 5px;
      }
      .header {
        width: 100%;
        background-color: var(--primary);
        display: flex;
        flex-direction: row;
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
        height: 195px;
        bottom: 0;
        left: 0;
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
    return <Unstyled message="No torrents." />;
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
          max-height: 748px;
        }
        #footer {
          position: sticky;
          width: inherit;
          bottom: 0;
          left: 0;
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
