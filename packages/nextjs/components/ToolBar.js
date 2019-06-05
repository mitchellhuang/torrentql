import React from 'react';
import Button from './Button';
import useModal from '../lib/useModal';
import AddTorrentModal from './modals/AddTorrentModal';
import { ME_QUERY } from '../apollo/queries';

const ToolBar = () => {
  const { active, toggle } = useModal();
  return (
    <div className="toolbar">
      <h3>Dashboard</h3>
      <Button onClick={toggle}>Add torrent</Button>
      <AddTorrentModal
        active={active}
        toggle={toggle}
        refetchQueries={[{ query: ME_QUERY }]}
      />
      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
