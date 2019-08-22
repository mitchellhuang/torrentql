import React from 'react';
import prettyBytes from 'pretty-bytes';
import classNames from 'classnames';
import Link from 'next/link';
import { CheckSquare, Square, Pause, Play } from 'react-feather';
import { torrentStatus } from '../lib/constants';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { UPDATE_SELECTED_TORRENTS_MUTATION } from '../apollo/mutations';
import { GET_DASHBOARD_QUERY } from '../apollo/queries';
import { TRow, TCell } from './Table';
import colors from '../lib/colors';

const TorrentHeader = ({ torrents, selected }) => {
  const [updateSelectedTorrents] = useMutation(UPDATE_SELECTED_TORRENTS_MUTATION);
  const allSelected = torrents.length === selected.length && torrents.length > 0;
  const handleSelection = () => {
    const selectedTorrents = allSelected ? [] : torrents.map(torrent => torrent.id);
    return updateSelectedTorrents({ variables: { selectedTorrents } });
  };
  return (
    <TRow header>
      <div className="checkbox" onClick={() => handleSelection()}>
        {!allSelected && <Square size={20} />}
        {allSelected && <CheckSquare size={20} />}
      </div>
      <TCell flex={5}>Name</TCell>
      <TCell flex={1}>Size</TCell>
      <TCell flex={2}>Progress</TCell>
      <TCell flex={1}>Down Speed</TCell>
      <TCell flex={1}>Up Speed</TCell>
      <TCell flex={1}>Peers</TCell>
      <TCell flex={1}>Seeds</TCell>
      <style jsx>{`
        .checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 15px;
        }
      `}</style>
    </TRow>
  );
};

const constrainRange = (x : string) : number => Math.max(parseInt(x, 10), 0);

const Torrent = ({
  torrent,
}) => {
  const [updateSelectedTorrents] = useMutation(UPDATE_SELECTED_TORRENTS_MUTATION);
  let { data: { getDashboard: { selectedTorrents } } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  const selected = selectedTorrents.includes(torrent.id);
  const handleSelection = () => {
    selectedTorrents = selectedTorrents.includes(torrent.id)
      ? selectedTorrents.filter(id => id !== torrent.id)
      : selectedTorrents.concat([torrent.id]);
    return updateSelectedTorrents({ variables : { selectedTorrents } });
  };
  return (
    <TRow
      key={torrent.id}
      selected={selected}
      onClick={() => handleSelection()}
      pointer
      hover
    >
      <div className="checkbox">
        <input type="checkbox" value={torrent.id} />
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
      <TCell flex={1}>
        {prettyBytes(torrent.totalSize)}
      </TCell>
      <TCell flex={2}>
        <ProgressBar progress={torrent.progress} state={torrent.state} />
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
          margin-right: 15px;
        }
        .checkbox input {
          width: 0;
          height: 0;
          visibility: hidden;
        }
      `}</style>
    </TRow>
  );
};

const ProgressBar = ({
  progress,
  state,
}) => {
  const iconSize = 20;
  const background = progress > 0
    ? `linear-gradient(to right, ${colors.green} ${progress}%, ${colors.lightGreen} 0)`
    : colors.lightGray;
  return (
    <div className="progress-bar">
      {state === torrentStatus.PAUSED && <Pause size={iconSize} className="icon" />}
      {state !== torrentStatus.PAUSED && <Play size={iconSize} className="icon" />}
      <div className="progress-bar-inner"/>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 10px;
          overflow: hidden;
        }
        .progress-bar :global(.icon) {
          fill: ${colors.blueGray};
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

export { Torrent as default, TorrentHeader, TRow, TCell };
