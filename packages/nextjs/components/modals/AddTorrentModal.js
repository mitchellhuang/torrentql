import React from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

const AddTorrentModal = props => (
  <Modal title="Add torrent" {...props}>
    <h5 className="mb-1">Magnet link or Torrent URL</h5>
    <Input placeholder="Enter a magnet link or torrent URL" />
    <h5 className="mb-1">Torrent file</h5>
    <Input placeholder="Add a torrent file" />
    <Button block>
      Add torrent
    </Button>
  </Modal>
);

export default AddTorrentModal;
