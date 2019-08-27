import React from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { ME_QUERY } from '../apollo/queries';
import { CREATE_API_KEY_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  name: yup
    .string()
    .required(),
});

const CreateApiKeyForm = ({ onFinished }) => {
  const [createApiKey] = useMutation(CREATE_API_KEY_MUTATION, {
    update(cache, { data: { createApiKey } }) {
      const { me } = cache.readQuery({ query: ME_QUERY });
      cache.writeQuery({
        query: ME_QUERY,
        data: { me: { ...me, apiKeys: me.apiKeys.concat([createApiKey]) } },
      });
    },
  });
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ name }) => {
      try {
        const result = await createApiKey({ variables: { name } });
        const { data: { createApiKey: { key } } } = result as any;
        onFinished(key);
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
    },
    validate: values => validateSync(schema, values),
  });
  const name = useField('name', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...name.input}
        type="text"
        label="Name"
        placeholder="Enter a name for your API key"
        error={name.meta.touched && name.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Create a new key</Button>
    </form>
  );
};

export default CreateApiKeyForm;
