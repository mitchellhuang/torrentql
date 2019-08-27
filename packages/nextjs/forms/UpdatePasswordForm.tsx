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
  oldPassword: yup
    .string()
    .required(),
  password: yup
    .string()
    .required()
    .min(8),
});

const UpdatePasswordForm = () => {
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ oldPassword, password }) => {
      try {
        await updateUserPassword({ variables: { oldPassword, password } });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
    },
    validate: values => validateSync(schema, values),
  });
  const oldPassword = useField('oldPassword', form);
  const password = useField('password', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...oldPassword.input}
        type="password"
        label="Old password"
        placeholder="Enter your old password"
        error={oldPassword.meta.touched && oldPassword.meta.error}
      />
      <Input
        {...password.input}
        type="password"
        label="New password"
        placeholder="Enter your new password"
        error={password.meta.touched && password.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Update password</Button>
    </form>
  );
};

export default UpdatePasswordForm;
