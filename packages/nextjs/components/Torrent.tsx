import React from 'react';
import prettyBytes from 'pretty-bytes';
import classNames from 'classnames';
import Link from "next/link";

interface ITRow extends React.HTMLProps<HTMLDivElement> {
  header?: boolean;
  selected?: boolean;
}

const TRow: React.StatelessComponent<ITRow> = ({
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
        padding: 10px 0;
        border: 2px solid transparent;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
        outline: none;
      }
      .row:not(:last-child) {
        margin-bottom: 10px;
      }
      .row:hover {
        background-color: var(--buttonHover);
      }
      .selected {
        border-color: var(--green);
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

const TCell = ({
  flex,
  children,
}) => (
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
        padding: 0 10px;
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
    <TCell flex={5}>
      <Link href={`/torrents/${torrent.id}`}>
        <a>
          {torrent.name}
        </a>
      </Link>
    </TCell>
    <TCell flex={2}>
      <ProgressBar state={torrent.state} progress={torrent.progress} color="var(--green)" />
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
  </TRow>
);

const ProgressBar = ({
  color,
  state,
  progress,
}) => (
  <div className="progress-bar">
    <div className="progress-bar-status">
      {state} {progress.toFixed(2)}%
    </div>
    <div className="progress-bar-inner" />
    <style jsx>{`
      .progress-bar {
        display: inline-block;
        position: relative;
        padding-right: 15px;
        width: 100%;
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
        border-radius: 5px;
        height: 22px;
      }
   `}</style>
  </div>
);

export { Torrent as default, TRow, TCell };
