import React from 'react';
import prettyBytes from 'pretty-bytes';
import Card from './Card';
import ProgressBar from './ProgressBar';

const InfoPanel = ({ torrent }) =>  (
  <div className="info-panel">
    <Card>
    <h5>{torrent.name}</h5>
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
          <span className="long-text">
          <b>ID</b>
          {torrent.id}</span>
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
          <span className="label">Tracker Status</span>
          {torrent.trackerStatus}
        </div>
        <div className="box">
          <span className="long-text">
            <b>Hash</b>
            {torrent.hash}
          </span>
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
          <span className="long-text">
            <b>Tracker</b>
            {torrent.tracker}
          </span>
        </div>
      </div>
    </div>
    </Card>
    <style jsx>{`
      .info-panel {
        position: absolute;
        bottom: 0;
        width: calc(100vw - 241px);
        box-shadow: 15px 0;
      }
      .label {
        font-weight: 600;
        font-weight: bold;
        margin-bottom: 2.5px;
        margin-right: 5px;
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
      }
      .content {
        display: flex;
        flex-direction: column;
      }
      .column:last-child .box:last-child {
        margin-bottom: 0;
      }
      .long-text {
        display: flex;
        flex-direction: column;
        word-break: break-all;
        font-weight: 600;
        margin-bottom: 2.5px;
        flex-direction: column-row;

      }
      .long-text:last-child {
        font-weight: 400;
      }
      @media(min-width: 768px) {
        .content {
          flex-direction: row;
        }
        .box {
          padding-right: 15px;
        }
        .box:last-child {
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
);

export default InfoPanel;
