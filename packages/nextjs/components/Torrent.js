import React from 'react';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = torrent.status;
  return (
    <div className="torrent">
      {isValidTorrent
        ? (
          <>
            <Info status={torrent.status} />
            {torrent.status.progress < 100
              && <ProgressBar progress={torrent.status.progress} state={torrent.status.state} />}
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

const Info = props => (
  <div className="info">
    <div className="name">
      <span className="icon">
        <img className="icon" src={props.status.state === 'seeding' ? seedingSVG : downloadingSVG} alt={props.status.state} />
      </span>
      <span>
        {props.status.name}
      </span>
    </div>
    <div className="seeding-info">
      <span className="peers">
        Peers: {props.status.numPeers} / {props.status.totalPeers}
      </span>
      <span className="seeds">
        Seeds: {props.status.numSeeds} / {props.status.totalSeeds}
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
        margin-right: 3px;
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
      <div className="progress-bar-inner">
        {state} {progress.toFixed(2)}%
      </div>
      <style jsx>{`
        .progress-bar {
          border: 1px solid var(--gray);
          border-radius: 5px;
          overflow: hidden;
          margin-top: 5px;
        }
        .progress-bar-inner {
          display: flex;
          align-items: center;
          text-transform: capitalize;
          width: ${progress}%;
          background-color: ${color || 'var(--gray)'};
          height: 22px;
          padding: 0 5px;
        }
     `}</style>
    </div>
  );
};

export default Torrent;
