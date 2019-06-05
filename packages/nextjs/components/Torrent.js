import React from 'react';
import ProgressBar from './ProgressBar';

const Torrent = ({
  torrent,
}) => (
  <div className="torrent">
    {torrent.status ? <ProgressBar className="mb-2" progress={torrent.status.progress} /> : null}
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
