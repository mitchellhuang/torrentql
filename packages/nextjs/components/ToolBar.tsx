import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import { Trash2, Plus } from 'react-feather';

const ToolBarButton = ({ children, onClick, icon }) => (
  <button onClick={onClick}>
    {icon}
    <div className="children">
      {children}
    </div>
    <style jsx>{`
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 10px;
        background-color: whiteSmoke;
        border-radius: 6px;
      }
      .children {
        margin-left: 3px;
      }
    `}</style>
  </button>
);

const ToolBar = ({ selected }) => {
  const { active, toggle } = useModal();
  const deleteTorrent = useMutation(DELETE_TORRENT_MUTATION);
  const handleDeleteTorrent = id => deleteTorrent({
    variables: { id },
    update: (store) => {
      const data = store.readQuery({ query: ME_QUERY });
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
      <ToolBarButton onClick={() => handleDeleteTorrent(selected.id)} icon={<Trash2 size={iconSize}/>}>
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
