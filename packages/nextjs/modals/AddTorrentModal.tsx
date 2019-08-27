import React from 'react';
import Modal from '../components/Modal';
import AddTorrentForm from '../forms/AddTorrentForm';

const AddTorrentModal = ({
  active,
  toggle,
}) => (
  <Modal
    title="Add torrent"
    active={active}
    toggle={toggle}
  >
    <AddTorrentForm onFinish={() => toggle()} />
  </Modal>
);

export default AddTorrentModal;
