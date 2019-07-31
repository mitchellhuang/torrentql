import React from 'react';
import prettyBytes from 'pretty-bytes';
import classNames from 'classnames';
import Link from 'next/link';
import { CheckSquare, Square, Percent } from 'react-feather';

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
        width: 100%;
        cursor: pointer;
        outline: none;
        font-weight: '400';
        height: 42.5px;
      }
      .row:not(.header):hover {
        background-color: #EEE;
      }
      .header {
        cursor: default;
        color: var(--blueGray);
        border-bottom: 1px solid var(--buttonHover);
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
        overflow: hidden;
        white-space: nowrap;
        height: 100%;
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
        <a
          className="torrent-name"
          onClick={e => e.stopPropagation()}>
          {torrent.name}
        </a>
      </Link>
    </TCell>
    <TCell flex={2}>
      <ProgressBar progress={torrent.progress} />
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
  progress,
}) => {
  const height = 25;
  const background = progress < 1
    ? 'var(--lightGray)'
    : `linear-gradient(to right, var(--green) ${progress}%, var(--lightGreen) 0)`;
  return (
    <div className="progress-bar">
      <Percent size={14} className="chevron-right" />
      <div className="progress-bar-inner"/>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: ${height}px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 10px;
          overflow: hidden;
        }
        .progress-bar-inner {
          width: 100%;
          height: 4px;
          margin-left: 5px;
          background: ${background};
        }
     `}</style>
    </div>
  );
};

export { Torrent as default, TRow, TCell };
