import React from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_PASSWORD_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  password: yup
    .string()
    .required(),
  newPassword: yup
    .string()
    .required()
    .min(8),
});

const UpdatePasswordForm = () => {
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ password, newPassword }) => {
      try {
        await updateUserPassword({ variables: { password, newPassword } });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
    },
    validate: values => validateSync(schema, values),
  });
  const password = useField('password', form);
  const newPassword = useField('newPassword', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...password.input}
        type="password"
        label="Existing password"
        placeholder="Enter your existing password"
        error={password.meta.touched && password.meta.error}
      />
      <Input
        {...newPassword.input}
        type="password"
        label="New password"
        placeholder="Enter your new password"
        error={newPassword.meta.touched && newPassword.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting}>Update password</Button>
    </form>
  );
};

export default UpdatePasswordForm;
