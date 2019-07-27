import React from 'react';
import prettyBytes from 'pretty-bytes';
import classNames from 'classnames';
import Link from 'next/link';
import { CheckSquare, Square } from 'react-feather';

interface ITRow extends React.HTMLProps<HTMLDivElement> {
  header?: boolean;
  selected?: boolean;
}

const TRow: React.FunctionComponent<ITRow> = ({
  children,
  className,
  header,
  selected,
  onClick,
}) => (
  <div
    className={classNames('row', { header, selected, [className]: className })}
    onClick={onClick}
    onKeyPress={onClick as any}
    role="button"
    tabIndex={0}
  >
    {children}
    <style jsx>{`
      .row {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: var(--black);
        background-color: var(--white);
        border: 1.5px solid transparent;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
        outline: none;
        font-weight: ${header ? '600' : '400'}
      }
      .row:nth-child(odd) {
        background-color: var(--buttonHover);
      }
      :not(.header):hover {
        border: 1.5px solid var(--gray);
      }
      .header {
        color: var(--lightGray);
        background-color: var(--primary);
        cursor: default;
      }
      .header:hover {
        background-color: var(--primary);
      }
    `}</style>
  </div>
);

const TCell = ({ flex, children }) => (
  <div className="t-cell">
    {children}
    <style jsx>{`
      .t-cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex: ${flex || 1};
        overflow: auto;
        white-space: nowrap;
        height: 45px;
        padding: 0 5px;
      }
    `}</style>
  </div>
);

const constrainRange = (x : string) : number => Math.max(parseInt(x, 10), 0);

const Torrent = ({
  torrent,
  selected,
  onClick,
}) => (
  <TRow key={torrent.id} selected={selected} onClick={onClick}>
    <div className="checkbox" onClick={onClick}>
      <input type="checkbox" value={torrent.id}/>
      {!selected && <Square size={20} />}
      {selected && <CheckSquare size={20} />}
    </div>
    <TCell flex={5}>
      <Link href={`/torrents/${torrent.id}`}>
        <a onClick={e => e.stopPropagation()}>
          {torrent.name}
        </a>
      </Link>
    </TCell>
    <TCell flex={2}>
      <ProgressBar state={torrent.state} progress={torrent.progress} />
    </TCell>
    <TCell flex={1}>
      {prettyBytes(torrent.downloadSpeed)}/s
    </TCell>
    <TCell flex={1}>
      {prettyBytes(torrent.uploadSpeed)}/s
    </TCell>
    <TCell flex={1}>
      {torrent.numPeers} / {constrainRange(torrent.totalPeers)}
    </TCell>
    <TCell flex={1}>
      {torrent.numSeeds} / {constrainRange(torrent.totalSeeds)}
    </TCell>
    <style jsx>{`
    .checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      padding: 0 10px;
    }
    .checkbox input {
      width: 0;
      height: 0;
      visibility: hidden;
    }
  `}</style>
  </TRow>
);

const ProgressBar = ({
  state,
  progress,
}) => {
  const height = 25;
  return (
    <div className="progress-bar">
      <div className="progress-bar-inner">
        <div className="progress-bar-status">
          {state} {progress.toFixed(2)}%
        </div>
      </div>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: ${height}px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          border: 1px solid var(--gray);
          border-radius: 5px;
          margin-right: 10px;
          overflow: hidden;
        }
        .progress-bar-inner {
          width: 100%;
          height: ${height}px;
          position: absolute;
          background: linear-gradient(to right, var(--gray) ${progress}%, var(--white) 0);
        }
        .progress-bar-status {
          width: 100%;
          height: ${height}px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-transform: capitalize;
          background: linear-gradient(to right, var(--white) calc(${progress}% - 10px), var(--gray) 0);
          background-clip: text;
          color: transparent;
          margin-left: 10px;
        }
     `}</style>
    </div>
  );
};

export { Torrent as default, TRow, TCell };
