import React from 'react';
import ProgressBar from './ProgressBar';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg'

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = torrent.status;
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
        }
      `}</style>
    </div>
  );
};

const Invalid = () => {
  return <div>
    Torrent unavailable.
      <style jsx>{`
        div {
          padding: 4px;
          color: slategray;
        }
    `}</style></div>;
}

const StateIcon = (props) => {
  const path = props.state === 'seeding' ? seedingSVG : downloadingSVG;
  return <span>
    <img src={path} style={{ height: 15, marginBottom: -3 }} />
  </span>
}

const SeedingInfo = (props) => {
  const seedingInfoList = [
    <StateIcon state={props.status.state} />,
    `Peers: ${props.status.numPeers}/${props.status.totalPeers}`,
    `Seeds: ${props.status.numSeeds}/${props.status.totalSeeds}`
  ];
  return <div className="seeding-info-name">
    <span className="name">
      {props.status.name}
    </span>
    <div className="seeding-info">
      {seedingInfoList.map((ele, idx) => <span key={idx}>{ele}</span>)}
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

export default Torrent;
