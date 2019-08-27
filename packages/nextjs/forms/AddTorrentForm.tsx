import React, { useState } from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TORRENT_MUTATION } from '../apollo/mutations';
import { GET_TORRENTS_QUERY } from '../apollo/queries';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  magnet: yup
    .string(),
});

const getFileBase64 = file => new Promise<string>((resolve) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = () => {
    resolve(btoa(reader.result as any));
  };
});

const AddTorrentForm = ({ onFinish }) => {
  const [file, setFile] = useState();
  const [addTorrent] = useMutation(ADD_TORRENT_MUTATION, {
    refetchQueries: [{ query: GET_TORRENTS_QUERY }],
  });
  const { form, handleSubmit, submitting, submitError } = useForm({
    onSubmit: async ({ magnet }) => {
      let data: string;
      if (magnet) {
        data = magnet;
      } else if (file) {
        data = await getFileBase64(file);
      }
      try {
        await addTorrent({
          variables: { data },
        });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
      onFinish();
    },
    validate: values => validateSync(schema, values),
  });
  const magnet = useField('magnet', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...magnet.input}
        type="text"
        label="Magnet link or torrent file URL"
        placeholder="Enter a magnet link or torrent file URL"
        error={magnet.meta.touched && magnet.meta.error}
      />
      <Input
        type="file"
        label="Torrent file"
        placeholder="Add a torrent file"
        onChange={(e: any) => setFile(e.target.files[0])}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={submitting} block>Add torrent</Button>
    </form>
  );
};

export default AddTorrentForm;
