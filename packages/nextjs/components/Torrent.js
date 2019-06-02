import React from 'react';

const Torrent = ({
  torrent,
}) => (
  <div className="torrent">
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
