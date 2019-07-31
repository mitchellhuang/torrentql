import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION, PAUSE_TORRENT_MUTATION, RESUME_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
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
          background-color: #EEE;
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

const ToolBar = ({ selected }) => {
  const { active, toggle } = useModal();
  const [deleteTorrent] = useMutation(DELETE_TORRENT_MUTATION);
  const [pauseTorrent] = useMutation(PAUSE_TORRENT_MUTATION);
  const [resumeTorrent] = useMutation(RESUME_TORRENT_MUTATION);
  const handleDeleteTorrent = id => deleteTorrent({
    variables: {
      id,
    },
    update: store => {
      const data : any = store.readQuery({ query: ME_QUERY });
      data.me.torrents = data.me.torrents.filter(torrent => torrent.id !== id);
      store.writeQuery({
        query: ME_QUERY,
        data,
      });
    },
  });
  const handlePauseTorrent = async (id) => {
    await pauseTorrent({
      variables: {
        id,
      },
      refetchQueries: [{ query: ME_QUERY }],
    });
  };
  const handleResumeTorrent = async (id) => {
    await resumeTorrent({
      variables: {
        id,
      },
      refetchQueries: [{ query: ME_QUERY }],
    });
  };
  const iconSize = 23;
  return (
    <div className="toolbar">
      <ToolBarButton
        onClick={() => selected.forEach(id => handleResumeTorrent(id))}
        icon={<Play size={iconSize}/>} />
      <ToolBarButton
        onClick={() => selected.forEach(id => handlePauseTorrent(id))}
        icon={<Pause size={iconSize}/>} />
      <span className="line-separator"/>
      <ToolBarButton onClick={toggle} icon={<Plus size={iconSize}/>} />
      <ToolBarButton
        onClick={() => selected.forEach(id => handleDeleteTorrent(id))}
        icon={<Minus size={iconSize}/>} />
      <AddTorrentModal active={active} toggle={toggle} />
      <style jsx>{`
        .toolbar {
          display: flex;
          padding: 5px;
          align-items: center;
          justify-content: flex-end;
          background-color: #EEE;
        }
        .line-separator {
          width: 2px;
          margin: 0 15px;
          height: 25px;
          background-color: var(--blueGray);
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
