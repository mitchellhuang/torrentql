import React, { Fragment } from 'react';
import prettyBytes from 'pretty-bytes';
import seedingSVG from '../static/seeding.svg';
import downloadingSVG from '../static/downloading.svg';
import checkSVG from '../static/check-mark.svg';
mport { useMutation } from 'react-apollo-hooks';
import { Row, Col } from '../layouts/Structures';
import deleteSVG from '../static/delete.svg';
import { ME_QUERY } from '../apollo/queries';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';

const TRow = ({
  children,
  className,
  onClick,
}) => (
  <div
    className={className ? `row ${className}` : 'row selected'}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
  >
    {children}
    <style jsx>{`
      .row {
        display: flex;
        margin: 10px 0;
        padding: 10px 0;
        flex-direction: row;
        border: 2px solid transparent;
        border-radius: 4px;
        width: 100%;
        background-color: var(--white);
        height: 27px;
        justify-content: flex-end;
        color: var(--darkGray);
      }
      .row:focus {
        outline: none;
      }
      .torrent:hover {
        background-color: var(--lightGray);
      }
      .selected {
        border: 2px solid var(--green);
        border-radius: 4px;
      }
      .header {
        color: var(--lightGray);
        background-color: var(--primary);
      }
    `}</style>
  </div>
);

const TCell = ({
  children,
  className,
  minWidth,
}) => (
  <div className={className ? `t-cell ${className}` : 't-cell'}>
    {children}
    <style jsx>{`
      .t-cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        min-width: ${minWidth || '100px'};
        height: 27px;
        padding: 0 5px;
      }
      .progress-bar-cell {
        align-items: inherit;
        flex-direction: column;
      }
    `}</style>
  </div>
);

const Torrent = ({
  torrent,
  selected,
  onTorrentSelected,
}) => {
  const useDeleteMutation = useMutation(DELETE_TORRENT_MUTATION);
  async function deleteTorrent(id) {
    await useDeleteMutation({
      variables: {
        id,
      },
      update: (store) => {
        const data = store.readQuery({ query: ME_QUERY });
        data.me.torrents = data.me.torrents.filter(torrent => torrent.id !== id);
        store.writeQuery({
          query: ME_QUERY,
          data,
        });
      },
    });
  }
  // eslint-disable-next-line max-len
  // TODO: add this to an element () => deleteTorrent(torrent.id)} onKeyPress={() => deleteTorrent(torrent.id)} role="button" tabIndex="0"
  return (
    <Fragment key={torrent.id}>
      <TRow className={selected ? 'torrent selected' : 'torrent'} onClick={onTorrentSelected}>
        <TCell className="torrent-name">
          {selected
            ? <img className="icon" src={checkSVG} alt="selected icon" />
            : <span className="empty-circle" />}
          <span className="name">
          {torrent.name}
        </span>
      </TCell>
      <TCell minWidth="170px" className="progress-bar-cell">
        <ProgressBar progress={torrent.progress} state={torrent.state} color="var(--green)" />
      </TCell>
      <TCell minWidth="130px">
        {prettyBytes(torrent.uploadSpeed)}/s
        <span className="state-icon">
          {torrent.uploadSpeed > 0 && <img src={seedingSVG} alt="seeding" />}
        </span>
      </TCell>
      <TCell minWidth="130px">
        {prettyBytes(torrent.downloadSpeed)}/s
        <span className="state-icon">
          {torrent.downloadSpeed > 0 && <img src={downloadingSVG} alt="seeding" />}
        </span>
        </TCell>
        <TCell>
          {torrent.numPeers} / {torrent.totalPeers}
        </TCell>
        <TCell>
          {torrent.numSeeds} / {torrent.totalSeeds}
        </TCell>
        <style jsx>{`
        :global(.torrent-name) {
          width: 100%;
          align-items: center;
          margin-left: 10px;
        }
        .empty-circle {
          width: 20px;
          height: 20px;
          border: 1px solid var(--gray);
          margin-right: 2px;
          border-radius: 12px;
        }
        .name, .state-icon {
          margin-left: 5px;
        }
        .state-icon img {
          height: 20px;
          opacity: 1;
          animation: fade 2.5s infinite alternate;
        }
        @keyframes fade {
          from { 
            opacity: 0; 
          }
        }
      `}</style>
      </TRow>
    </Fragment>
  );
};

const ProgressBar = ({
  color,
  progress,
  className,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div className={progressBarClass}>
      <div className="progress-bar-status">
        {progress.toFixed(2)}%
      </div>
      <div className="progress-bar-inner" />
      <style jsx>{`
        .progress-bar {
          position: relative;
          padding-right: 15px;
        }
        .progress-bar-status {
          display: flex;
          align-items: center;
          height: 22px;
          margin-left: 5px;
          position: absolute;
          padding: 0 5px;
          text-transform: capitalize;
        }
        .progress-bar-inner {
          width: ${progress}%;
          background-color: ${color || 'var(--gray)'};
          border-radius: 4px;
          height: 22px;
        }
     `}</style>
    </div>
  );
};

export { Torrent as default, TRow, TCell };
