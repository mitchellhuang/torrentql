import React from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_EMAIL_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
});

const UpdateEmailForm = () => {
  const [updateUserEmail] = useMutation(UPDATE_USER_EMAIL_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ email }) => {
      try {
        await updateUserEmail({ variables: { email } });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
    },
    validate: values => validateSync(schema, values),
  });
  const email = useField('email', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...email.input}
        type="email"
        label="Email"
        placeholder="Enter your new email"
        error={email.meta.touched && email.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Update email</Button>
    </form>
  );
};

export default UpdateEmailForm;
