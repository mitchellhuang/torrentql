import React from 'react';
import ProgressBar from './ProgressBar';

const Torrent = ({
  torrent,
}) => (
  <div className="torrent">
    <ProgressBar className="progress-bar" progress={torrent.status.progress} color="var(--primary)" />
    {JSON.stringify(torrent)}   
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
    `}</style>
  </div>
);

export default Torrent;
