import React from 'react';
import colors from '../lib/colors';

const InfoPanel = ({
  torrent,
}) => (
  <div className="info-panel">
    <div className="wrapper wrapper-no-max-width">
      Info | Files | Peers
      <pre>{JSON.stringify(torrent, null, 2)}</pre>
    </div>
    <style jsx>{`
      .info-panel {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 50vh;
        background-color: ${colors.white};
        overflow-y: scroll;
        border: 1px solid ${colors.border};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    `}</style>
  </div>
);

export default InfoPanel;
