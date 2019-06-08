import React from 'react';
import ProgressBar from './ProgressBar';

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = Math.random() > .5;
  const SeedingInfo = (props) => {
    const seedingInfoList = [
      `Status: ${props.status.state}`,
      `Peers: ${props.status.numPeers}/${props.status.totalPeers}`,
      `Seeds: ${props.status.numSeeds}/${props.status.totalSeeds}`
    ];
    return <div className="seeding-info-name">
        <span className="name">
          {props.status.name}
        </span>
        <div className="seeding-info">
          {seedingInfoList.map(ele => <span>{ele}</span>)}
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
          .seeding-info > span {
            margin-left: 10px;
          }
        `}</style>
      </div>
  }
  const Invalid = (props) => {
    return <div>
      Torrent unavailable.
      <style jsx>{`
        div {
          padding: 4px;
          color: slategray;
        }
    `}</style></div>;
  }
  return (
    <div className="torrent mb-2 p-2">
      {!isValidTorrent && <Invalid/>}
      {isValidTorrent && <SeedingInfo status={torrent.status} />}
      {isValidTorrent && <ProgressBar progress={torrent.status.progress} />}
      <style jsx>{`
        .torrent {
          border: 2px solid lightgray;
          border-radius: 10px;
          font-size: 10pt;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

export default Torrent;
