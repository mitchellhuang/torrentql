import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION, PAUSE_TORRENT_MUTATION, RESUME_TORRENT_MUTATION } from '../apollo/mutations';
import { GET_DASHBOARD_QUERY, ME_QUERY } from '../apollo/queries';
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
          padding: 5px;
          margin: 0 10px;
          color: var(--blueGray);
          background-color: var(--toolBarGray);
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
    update: (store) => {
      const data : any = store.readQuery({ query: ME_QUERY });
      data.me.torrents = data.me.torrents.filter(torrent => torrent.id !== id);
      store.writeQuery({
        query: ME_QUERY,
        data,
      });
    },
  });
  const handlePauseTorrent = id => pauseTorrent({
    variables: { id },
  });
  const handleResumeTorrent = id => resumeTorrent({
    variables: { id },
  });
  const iconSize = 23;
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
          padding: 5px;
          align-items: center;
          justify-content: flex-start;
          background-color: var(--toolBarGray);
        }
        .toolbar :global(.icon):hover {
          fill: var(--blueGray);
        }
        .line-separator {
          width: 2px;
          margin: 0 15px;
          height: 25px;
          background-color: var(--blueGray);
        }
        @media(min-width: 768px) {
        .toolbar {
          justify-content: flex-end;
          position: sticky;
          z-index: 1;
          top: 65px;
        }
      }
      `}</style>
    </div>
  );
};

export default ToolBar;
