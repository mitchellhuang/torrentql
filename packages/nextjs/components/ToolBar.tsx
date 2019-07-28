import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import { Trash2, Plus } from 'react-feather';

interface IToolBarButton extends React.HTMLProps<HTMLInputElement>  {
  icon: React.ReactElement;
  primary?: Boolean;
}

const ToolBarButton: React.FunctionComponent<IToolBarButton> = ({
  children,
  onClick,
  icon,
  className,
  primary,
}) => (
  <div className="tool-bar-button">
    <button onClick={onClick} className={className}>
      {icon}
      <div className="children">
        {children}
      </div>
    </button>
    <style jsx>{`
        button {
          display: flex;
          padding: 7.5px 10px;
          color: ${primary ? 'var(--white)' : 'var(--primary)'};
          background-color: ${primary ? 'var(--primary)' : 'var(--white)'};
          border: 1px solid var(--primary);
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .children {
          margin-left: 5px;
        }
      `}</style>
  </div>
);

const ToolBar = ({ selected }) => {
  const { active, toggle } = useModal();
  const [deleteTorrent] = useMutation(DELETE_TORRENT_MUTATION);
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
  const iconSize = 18;
  return (
    <div className="toolbar">
      <ToolBarButton onClick={toggle} icon={<Plus size={iconSize}/>} primary>
        Add
      </ToolBarButton>
      <ToolBarButton
        className="ml-2"
        onClick={() => selected.forEach(id => handleDeleteTorrent(id))}
        icon={<Trash2 size={iconSize}/>}>
        Delete
      </ToolBarButton>
      <AddTorrentModal active={active} toggle={toggle} />
      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
