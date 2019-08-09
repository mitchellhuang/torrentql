import React, { useState } from 'react';
import prettyBytes from 'pretty-bytes';
import { X } from 'react-feather';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_FOCUSED_TORRENT_MUTATION } from '../apollo/mutations';
import FileExplorer from '../components/FileExplorer';
import Card from './Card';
import ProgressBar from './ProgressBar';
const InfoPanel = ({ torrent }) => (
  <>
    <ProgressBar progress={torrent.progress} state={torrent.state} />
    <div className="content">
      <div className="column">
        <div className="box">
          <span className="label">Progress</span>
          {torrent.progress}%
        </div>
        <div className="box">
          <span className="label">Download Speed</span>
          {prettyBytes(torrent.downloadSpeed)}
        </div>
        <div className="box">
          <span className="label">Number of Seeds</span>
          {torrent.numSeeds}
        </div>
        <div className="box">
          <span className="label">Total Wanted</span>
          {prettyBytes(torrent.totalWanted)}
        </div>
        <div className="box">
          <span className="label">Tracker Host</span>
          {torrent.trackerHost}
        </div>
        <div className="box">
          <span className="label" id="id-label">ID</span>
          {torrent.id}
        </div>
      </div>
      <div className="column">
        <div className="box">
          <span className="label">Ratio</span>
          {torrent.ratio.toFixed(2)}
        </div>
        <div className="box">
          <span className="label">Eta</span>
          {torrent.eta}
        </div>
        <div className="box">
          <span className="label">Total Peers</span>
          {torrent.totalPeers}
        </div>
        <div className="box">
          <span className="label">Total Downloaded</span>
          {prettyBytes(torrent.totalDownloaded)}
        </div>
        <div className="box">
          <span className="label">Size</span>
          {prettyBytes(69000000)}
        </div>
        <div className="box">
          <span className="label" id="hash-label">Hash</span>
          {torrent.hash}
        </div>
      </div>
      <div className="column">
        <div className="box">
          <span className="label">State</span>
          {torrent.state}
        </div>
        <div className="box">
          <span className="label">Upload Speed</span>
          {prettyBytes(torrent.uploadSpeed)}
        </div>
        <div className="box">
          <span className="label">Number of Peers</span>
          {torrent.numPeers}
        </div>
        <div className="box">
          <span className="label">Total Seeds</span>
          {torrent.totalSeeds}
        </div>
        <div className="box">
          <span className="label">Total Uploaded</span>
          {prettyBytes(torrent.totalUploaded)}
        </div>
        <div className="box">
          <span className="label" id="tracker-status-label">Tracker Status</span>
          {torrent.trackerStatus}
        </div>
      </div>
    </div>
    <style jsx>{`
      #tracker-status-label {
        width: 160px;
      }
      #hash-label {
        width: 80px;
      }
      #id-label {
        width: 30px;
      }
      .label {
        font-weight: 600;
        word-break: none;
      }
      .column {
        flex: 1;
        overflow: auto;
      }
      .box {
        font-weight: 10;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        word-break: break-word;
        justify-content: space-between;
      }
      .value {
        display: flex;
        flex-direction:row;
        justify-content: space-between;
      }
      .content {
        display: flex;
        flex-direction: column;
      }
      @media(min-width: 768px) {
        .content {
          flex-direction: row;
        }
        .box {
          padding-right: 15px;
          display: flex;
          justify-content: space-between;
        }
        .box:last-child {
          margin-bottom: 0;
        }
      }
    `}</style>
  </>
);

const InfoPopup = ({ torrent }) =>  {
  const [updateFocusedTorrent] = useMutation(UPDATE_FOCUSED_TORRENT_MUTATION);
  const [selectedTab, setSelectedTab] = useState(1);
  const handleClose = focusedTorrent => updateFocusedTorrent({ variables: { focusedTorrent } });
  const tabPanels = [
    <FileExplorer torrent={torrent} />,
    <InfoPanel torrent={torrent} />,
  ];
  const tabs = ['Files', 'Info'];
  return (
  <div className="info-panel">
    <Card noBorder>
      <ul>
        {tabs.map((tab, idx) => (
          <li key={tab} onClick={() => setSelectedTab(idx)} className={selectedTab === idx ? 'active' : null}>
            {tab}
          </li>
        ))}
      </ul>
      <div className="banner">
        <h5>{torrent.name}</h5>
        <div className="close" onClick={() => handleClose(null)} >
          <X/>
        </div>
      </div>
      <div className="tab">
        {tabPanels[selectedTab]}
      </div>
    </Card>
    <style jsx>{`
      .banner {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .info-panel {
        position: sticky;
        bottom: 0;
        font-size: 14px;
        display: flex;
      }
      .info-panel :global(.card) {
        background-color: var(--toolBarGray);
        min-height: 220px;
        flex: 1;
      }
      ul {
        position: absolute;
        left: -10px;
        bottom: 90px;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        list-style-type: none;
        font-size: 16px;
        height: 20px;
        transform-origin: left;
        transform: rotate(270deg);
        flex: 0;
      }
      li {
        bottom: 0;
        padding: 5px 20px;
        color: var(--primary);
        background-color: var(--toolBarGray);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        margin-left: 5px;
        cursor: pointer;
      }
      li.active {
        color: var(--black);
      }
    `}</style>
  </div>
  );
};

export default InfoPopup;
