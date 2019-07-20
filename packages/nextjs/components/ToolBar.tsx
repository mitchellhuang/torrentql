import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import { Trash2, Plus } from 'react-feather';

interface IToolBarButton extends React.HTMLProps<HTMLInputElement>  {
  icon: React.ReactElement;
}

const ToolBarButton: React.StatelessComponent<IToolBarButton> = ({
  children,
  onClick,
  icon,
  className,
}) => (
  <button onClick={onClick} className={className}>
    {icon}
    <div className="children">
      {children}
    </div>
    <style jsx>{`
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        background-color: whiteSmoke;
        border-radius: 5px;
        outline: none;
      }
      button:hover {
        background-color: var(--buttonHover);
      }
      .children {
        margin-left: 5px;
      }
    `}</style>
  </button>
);

const ToolBar = ({ selected }) => {
  const { active, toggle } = useModal();
  const deleteTorrent = useMutation(DELETE_TORRENT_MUTATION);
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
      <ToolBarButton onClick={toggle} icon={<Plus size={iconSize}/>}>
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
          justify-content: flex-start;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
