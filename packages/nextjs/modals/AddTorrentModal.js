import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { ADD_TORRENT_MUTATION } from '../apollo/mutations';
import { ME_QUERY } from '../apollo/queries';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/transformErrors';

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
  const addTorrent = useMutation(ADD_TORRENT_MUTATION);
  return (
    <Modal
      title="Add torrent"
      active={active}
      toggle={toggle}
    >
      <Formik
        initialValues={{ magnet: '', file: null }}
        initialStatus={{}}
        onSubmit={async ({ magnet, file }, { setSubmitting, setStatus }) => {
          let data;
          if (magnet) {
            data = magnet;
          } else if (file) {
            const file64 = await getFileBase64(file);
            data = file64;
          }
          try {
            await addTorrent({
              variables: {
                data,
              },
              refetchQueries: [{ query: ME_QUERY }],
            });
            toggle();
            setSubmitting(false);
          } catch (err) {
            setStatus(transformErrors(err));
            setSubmitting(false);
          }
        }}
        render={({
          values: { magnet },
          status,
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
            <Error error={status.error} />
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
