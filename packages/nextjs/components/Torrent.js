import React from 'react';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = torrent.name;
  return (
    <div className="torrent">
      {isValidTorrent
        ? (
          <>
            <Info torrent={torrent} />
            {torrent.progress < 100
              && <ProgressBar progress={torrent.progress} state={torrent.state} />}
          </>
        ) : <Invalid />}
      <style jsx>{`
        .torrent {
          padding: 10px;
          border: 1px solid var(--gray);
          border-radius: 5px;
        }
        .torrent:not(:last-child) { 
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

const Invalid = () => (
  <div>
    Torrent unavailable.
    <style jsx> {`
      div {
        padding: 3px 0;
      }
    `}</style>
  </div>
);

const Info = ({
  torrent,
}) => (
  <div className="info">
    <div className="name">
      <span className="icon">
        <img className="icon" src={torrent.state === 'seeding' ? seedingSVG : downloadingSVG} alt={torrent.state} />
      </span>
      <span>
        {torrent.name}
      </span>
    </div>
    <div className="seeding-info">
      <span className="peers">
        Peers: {torrent.numPeers} / {torrent.totalPeers}
      </span>
      <span className="seeds">
        Seeds: {torrent.numSeeds} / {torrent.totalSeeds}
      </span>
    </div>
    <style jsx>{`
      .info {
        display: flex;
        justify-content: space-between;
      }
      .peers {
        margin-right: 15px;
      }
      .icon {
        height: 15px;
        margin-bottom: -2px;
        margin-right: 2px;
      }
    `}</style>
  </div>
);

const ProgressBar = ({
  color,
  progress,
  state,
  className,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div className={progressBarClass}>
      <div className="progress-bar-status">
        {state} {progress.toFixed(2)}%
      </div>
      <div className="progress-bar-inner" />
      <style jsx>{`
        .progress-bar {
          border: 1px solid var(--gray);
          border-radius: 5px;
          overflow: hidden;
          margin-top: 5px;
        }
        .progress-bar-status {
          display: flex;
          align-items: center;
          height: 22px;
          position: absolute;
          padding: 0 5px;
          text-transform: capitalize;
        }
        .progress-bar-inner {
          width: ${progress}%;
          background-color: ${color || 'var(--gray)'};
          height: 22px;
        }
     `}</style>
    </div>
  );
};

export default Torrent;
