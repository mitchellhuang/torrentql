import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION, PAUSE_TORRENT_MUTATION, RESUME_TORRENT_MUTATION } from '../apollo/mutations';
import { GET_DASHBOARD_QUERY, GET_TORRENTS_QUERY } from '../apollo/queries';
import { Minus, Plus, Pause, Play } from 'react-feather';

interface IToolBarButton extends React.HTMLProps<HTMLInputElement>  {
  icon: React.ReactElement;
  primary?: Boolean;
}

const ToolBarButton: React.FunctionComponent<IToolBarButton> = ({
  onClick,
  icon,
  className,
}) => (
  <div className="tool-bar-button">
    <button onClick={onClick} className={className}>
      {icon}
    </button>
    <style jsx>{`
      button {
        display: flex;
        color: var(--blue-gray);
        background-color: var(--toolbar-gray);
        border: none;
        outline: none;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        font-weight: 600;
        transition: all 0.15s ease;
      }
    `}</style>
  </div>
);

const ToolBar = () => {
  const { active, toggle } = useModal();
  const [deleteTorrent] = useMutation(DELETE_TORRENT_MUTATION);
  const [pauseTorrent] = useMutation(PAUSE_TORRENT_MUTATION);
  const [resumeTorrent] = useMutation(RESUME_TORRENT_MUTATION);
  const { data: { getDashboard: { selectedTorrents } } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  const handleDeleteTorrent = id => deleteTorrent({
    variables: {
      id,
    },
    update: (cache) => {
      let { getTorrents } = cache.readQuery({ query: GET_TORRENTS_QUERY });
      getTorrents = getTorrents.filter(torrent => torrent.id !== id);
      cache.writeQuery({
        query: GET_TORRENTS_QUERY,
        data: { getTorrents },
      });
    },
  });
  const handlePauseTorrent = id => pauseTorrent({
    variables: { id },
  });
  const handleResumeTorrent = id => resumeTorrent({
    variables: { id },
  });
  const iconSize = 22;
  return (
    <div className="toolbar">
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handleResumeTorrent(id))}
        icon={<Play size={iconSize} className="icon" />} />
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handlePauseTorrent(id))}
        icon={<Pause size={iconSize} className="icon" />} />
      <span className="line-separator" />
      <ToolBarButton onClick={toggle} icon={<Plus size={iconSize} />} />
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handleDeleteTorrent(id))}
        icon={<Minus size={iconSize} />} />
      <AddTorrentModal active={active} toggle={toggle} />
      <style jsx>{`
        .toolbar {
          display: flex;
          height: 38px;
          align-items: center;
          justify-content: flex-start;
          background-color: var(--toolbar-gray);
          padding: 0 8px;
        }
        .toolbar :global(.icon):hover {
          fill: var(--blue-gray);
        }
        .line-separator {
          width: 2px;
          margin: 0 15px;
          height: 25px;
          background-color: var(--blue-gray);
        }
        @media(min-width: 768px) {
          .toolbar {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
