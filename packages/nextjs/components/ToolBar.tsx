import React from 'react';
import useModal from '../lib/useModal';
import AddTorrentModal from '../modals/AddTorrentModal';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import deleteIcon from '../static/trash-2.svg';
import addIcon from '../static/plus.svg';

const ToolBarButton = ({ children, onClick, src, alt }) => (
  <button onClick={onClick}>
    <img src={src} alt={alt} />
    {children}
    <style jsx>{`
      button {
        display: flex;
        justify-content: center;
        padding: 6px 10px;
        background-color: whiteSmoke;
        border-radius: 6px;
      }
      img {
        margin-right: 3px;
        height: 15px;
        width: 15px;
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
  return (
    <div className="toolbar">
      <ToolBarButton onClick={toggle} src={addIcon} alt="add">
        Add
      </ToolBarButton>
      <ToolBarButton onClick={() => handleDeleteTorrent(selected.id)} src={deleteIcon} alt="delete">
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
