import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TORRENT_MUTATION, PAUSE_TORRENT_MUTATION, RESUME_TORRENT_MUTATION } from '../apollo/mutations';
import { GET_TORRENTS_QUERY } from '../apollo/queries';
import { Minus, Plus, Pause, Play } from 'react-feather';
import colors from '../lib/colors';

interface IToolBarButton extends React.HTMLProps<HTMLElement>  {
  icon: React.ReactNode;
  primary?: Boolean;
}

const ToolBarButton: React.FunctionComponent<IToolBarButton> = ({
  onClick,
  icon,
  className,
}) => (
  <button onClick={onClick} className={className}>
    {icon}
    <style jsx>{`
      button {
        display: flex;
        color: ${colors.blueGray};
        background-color: ${colors.toolbarGray};
        border: none;
        outline: none;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        font-weight: 600;
        transition: all 0.15s ease;
        padding: 0;
      }
    `}</style>
  </button>
);

const ToolBar = ({
  selectedTorrents,
}) => {
  const { active, toggle } = useModal();
  const [deleteTorrent] = useMutation(DELETE_TORRENT_MUTATION);
  const [pauseTorrent] = useMutation(PAUSE_TORRENT_MUTATION);
  const [resumeTorrent] = useMutation(RESUME_TORRENT_MUTATION);
  const handleDeleteTorrent = id => deleteTorrent({
    variables: {
      id,
    },
    update: (cache) => {
      const { getTorrents } = cache.readQuery({ query: GET_TORRENTS_QUERY });
      cache.writeQuery({
        query: GET_TORRENTS_QUERY,
        data: { getTorrents: getTorrents.filter(torrent => torrent.id !== id) },
      });
    },
  });
  const handlePauseTorrent = id => pauseTorrent({ variables: { id } });
  const handleResumeTorrent = id => resumeTorrent({ variables: { id } });
  const size = 22;
  return (
    <div className="toolbar">
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handleResumeTorrent(id))}
        icon={<Play size={size} />}
        className="mr" />
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handlePauseTorrent(id))}
        icon={<Pause size={size} />} />
      <span className="line-separator" />
      <ToolBarButton
        onClick={toggle}
        icon={<Plus size={size} />}
        className="mr" />
      <ToolBarButton
        onClick={() => selectedTorrents.forEach(id => handleDeleteTorrent(id))}
        icon={<Minus size={size} />} />
      <AddTorrentModal active={active} toggle={toggle} />
      <style jsx>{`
        .toolbar {
          display: flex;
          height: 38px;
          align-items: center;
          justify-content: flex-start;
          background-color: ${colors.toolbarGray};
          padding: 0 15px;
        }
        .toolbar :global(.icon):hover {
          fill: ${colors.blueGray};
        }
        .toolbar :global(.mr) {
          margin-right: 12px;
        }
        .line-separator {
          width: 2px;
          margin: 0 20px;
          height: 25px;
          background-color: ${colors.blueGray};
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
