import React, { useState } from 'react';
import prettyBytes from 'pretty-bytes';
import { X } from 'react-feather';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_FOCUSED_TORRENT_MUTATION } from '../apollo/mutations';
import FileExplorer from '../components/FileExplorer';
import Card from './Card';
import ProgressBar from './ProgressBar';
import Button from '../components/Button';
const InfoPanel = ({ torrent }) => (
  <>
    <ProgressBar progress={torrent.progress} state={torrent.state} />
    <div className="content">
      <div className="column">
        <Card noBorder>
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
        </Card>
      </div>
      <div className="column">
        <Card noBorder>
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
        </Card>
      </div>
      <div className="column">
        <Card noBorder>
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
        </Card>
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
  const [selectedTab, setSelectedTab] = useState(0);
  const handleClose = focusedTorrent => updateFocusedTorrent({ variables: { focusedTorrent } });
  const tabs = [
    <InfoPanel torrent={torrent} />,
    <FileExplorer torrent={torrent} />,
  ];
  return (
  <div className="info-panel">
    <Card noBorder>
      <div className="banner">
        <h5>{torrent.name}</h5>
        <div className="close" onClick={() => handleClose(null)} >
          <X/>
        </div>
      </div>
      <ul>
        <li onClick={() => setSelectedTab(0)}>
          <Button>
            Info
          </Button>
        </li>
        <li onClick={() => setSelectedTab(1)}>
          <Button>
            Files
          </Button>
        </li>
      </ul>
      <div className="tab">
        {tabs[selectedTab]}
      </div>
    </Card>
    <style jsx>{`
      .banner {
        display: flex;
        flex-direction:row;
        justify-content: space-between;
      }
      .info-panel {
        position: sticky;
        bottom: 0;
        font-size: 14px;
      }
      .info-panel :global(.card) {
        background-color: var(--toolBarGray);
        height: 300px;
      }
      ul {
        position: sticky;
        bottom: 0;
        display: flex;
        flex-direction: row;
        list-style-type: none;
      }
      li {
        margin-right: 5px;
        position: sticky;
        bottom: 0;
        margin-left: 5px;
      }
    `}</style>
  </div>
  );
};

export default InfoPopup;
