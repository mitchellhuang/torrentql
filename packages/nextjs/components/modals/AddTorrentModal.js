import React from 'react';
import Modal from '../Modal';

const AddTorrentModal = props => (
  <Modal title="Add torrent" {...props}>
    <h3>Magnet link</h3>
    <h3>Torrent URL</h3>
    <h3>Torrent file</h3>
  </Modal>
);

export default AddTorrentModal;
