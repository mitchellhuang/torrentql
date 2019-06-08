import React from 'react';
import ProgressBar from './ProgressBar';

const Torrent = ({
  torrent,
}) => {
  if (!torrent.status) {
    return (
      <div>
        Invalid torrent.
      </div>
    );
  }
  return (
    <div className="torrent">
      <div className="torrent-info">
        <span className="name">
          {torrent.status.name}
        </span>
        <div className="state">
           Status: {torrent.status.state}
        </div>
        <div className="peers">
          Peers: {torrent.status.numPeers}/{torrent.status.totalPeers}
        </div>
        <div className="seeds">
          Seeds: {torrent.status.numSeeds}/{torrent.status.totalSeeds}
        </div>
      </div>
      <ProgressBar progress={30} />
      <style jsx>{`
        .torrent {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          word-break: break-all;
        }
        .torrent:not(:last-child) {
          margin-bottom: 15px;
        }
        .name {
          font-size: 14px;
        }
        .state {
          display: inline;
          float: right;
          margin-left: 10px;
          font-size: 14px;
        }
        .seeds {
          display: inline;
          float: right;
          margin-left: 10px;
          margin-top: 0px;
          font-size: 14px;
        }
        .peers {
          display: inline;
          float: right;
          margin-left: 10px;
          margin-top: 0px;
          top-padding: 0px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Torrent;
