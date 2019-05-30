import React from 'react';
import { Formik, Form } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

const ADD_TORRENT_MUTATION = gql`
  mutation addTorrent($data: String!) {
    addTorrent(data: $data) {
      id
    }
  }
`;

const getFileBase64 = file => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const binaryString = e.target.result;
    resolve(btoa(binaryString));
  };
  reader.readAsBinaryString(file);
});

const AddTorrentModal = ({
  active,
  toggle,
}) => {
  const [addTorrent] = useMutation(ADD_TORRENT_MUTATION);

  return (
    <Modal
      title="Add torrent"
      active={active}
      toggle={toggle}
    >
      <Formik
        initialValues={{ magnet: '', file: null }}
        onSubmit={async ({ magnet, file }, { setSubmitting }) => {
          if (magnet) {
            await addTorrent({
              variables: {
                data: magnet,
              },
            });
            toggle();
          } else if (file) {
            const file64 = await getFileBase64(file);
            await addTorrent({
              variables: {
                data: file64,
              },
            });
            toggle();
          }
          setSubmitting(false);
        }}
        render={({
          values: { magnet },
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <h5 className="mb-2">Magnet link or Torrent URL</h5>
            <Input
              id="magnet"
              type="text"
              placeholder="Enter a magnet link or torrent URL"
              value={magnet}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <h5 className="mb-2">Torrent file</h5>
            <Input
              id="file"
              type="file"
              placeholder="Add a torrent file"
              onChange={e => setFieldValue('file', e.target.files[0])}
              onBlur={handleBlur}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              block
            >
              Add torrent
            </Button>
          </Form>
        )}
      />
    </Modal>
  );
};

export default AddTorrentModal;
