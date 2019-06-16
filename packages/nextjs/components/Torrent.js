import React from 'react';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import { useMutation } from 'react-apollo-hooks';

const Torrent = ({
  torrent,
}) => (
  <div className="torrent">
    <Info torrent={torrent} />
    <ProgressBar progress={torrent.progress} state={torrent.state} />
    <style jsx>{`
      .torrent {
        padding: 10px;
        border: 1px solid var(--gray);
        border-radius: 5px;
        min-width: 768px;
      }
      .torrent:not(:last-child) {
        margin-bottom: 6px;
      }
    `}</style>
  </div>
);

async function deleteTorrent(id) {
  const deleteMutation = useMutation(DELETE_TORRENT_MUTATION);
  const result = await deleteMutation({
    variables: {
      id,
    },
  });
}

const Info = ({
  torrent,
}) => (
  <div className="info">
    <div className="name">
      <span className="icon">
        <img onClick={()=>deleteTorrent(torrent.id)} className="icon" src="../static/delete.png" alt={torrent.state} />
      </span>
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
          margin-top: 5px;
          position: relative;
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
