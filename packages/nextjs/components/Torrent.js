import React from 'react';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = torrent.status;
  return (
    <div className="torrent">
      {!isValidTorrent && <Invalid />}
      {isValidTorrent && <Info status={torrent.status} />}
      {isValidTorrent && torrent.status.progress < 100 && <ProgressBar progress={torrent.status.progress} />}
      <style jsx>{`
        .torrent {
          padding: 5px;
          border: 2px solid lightgray;
          border-radius: 10px;
          font-size: 10pt;
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

const Invalid = () => {
  return (
    <div>
      Torrent unavailable.
      <style jsx> {`
        div {
          padding: 0 4px;
          color: slategray;
        }
    `}</style>
    </div>
  );
};

const Info = (props) => {
  const path = props.status.state === 'seeding' ? seedingSVG : downloadingSVG;
  return (
    <div className="seeding-info-name">
      <span className="name">
        {props.status.name}
      </span>
      <div className="seeding-info">
        <span className="icon">
          <img className="icon" src={path} />
        </span>
        <span className="peer">
          {`Peers: ${props.status.numPeers}/${props.status.totalPeers}`}
        </span>
        <span className="seed">
          {`Seeds: ${props.status.numSeeds}/${props.status.totalSeeds}`}
        </span>
      </div>
      <style jsx>{`
        .seeding-info-name {
          display: flex;
          justify-content: space-between;
        }
        .name {
          margin-left: 3px;
        }
        .seeding-info {
          margin-right: 5px;
        }
        div.seeding-info > span {
          text-align: right;
          float: left;
        }
        .seed  {
          min-width: 100px;
        }
        .peer {
          min-width: 80px;
        }
        .icon {
          height: 15px;
          margin-bottom: -3px;
        }
        `}</style>
    </div>
  );
};

const ProgressBar = ({
  className,
  color,
  progress,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div className="status rounded">
      <div className={`${progressBarClass} rounded`}>
        <span>
          {progress.toFixed(2)}%
        </span>
      </div>
      <style jsx>{`
        .progress-bar {
          width: ${progress}%;
          background-color: ${color || 'var(--primary)'};
          height: 20px;
          background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
          background-size: 1rem 1rem;
          animation-name: progress-bar-stripes;
          animation-duration: 3s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          text-align: center;
          min-width: 50px;
          display: flex;
          flex-direction: row;
        }
        @keyframes progress-bar-stripes {
          from { background-position: 115px 0; }
          to { background-position: 0 0; }
        }
        .rounded {
          border-radius: 15px;
          margin-top: 1px;

        }
        .status{
          border: 2px solid lightgray;
          margin-top: 1px;
        }
     `}</style>
    </div>
  );
};

export default Torrent;
