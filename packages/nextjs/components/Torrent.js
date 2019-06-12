import React from 'react';
import ProgressBar from './ProgressBar';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';

const Torrent = ({
  torrent,
}) => {
  const isValidTorrent = torrent.status;
  return (
    <div className="torrent mb-2 p-2">
      {!isValidTorrent && <Invalid/>}
      {isValidTorrent && <Info status={torrent.status} />}
      {isValidTorrent && torrent.status.progress < 100 && <ProgressBar progress={torrent.status.progress} />}
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
          <img src={path} style={{ height: 15, marginBottom: -3 }} />
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

        `}</style>
    </div>
  );
};

export default Torrent;
