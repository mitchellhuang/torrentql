import React from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { RESET_PASSWORD_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8),
});

const ResetPasswordForm = ({ secret, onComplete }) => {
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ password }) => {
      try {
        await resetPassword({ variables: { password, key: secret } });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
      onComplete();
    },
    validate: values => validateSync(schema, values),
  });
  const password = useField('password', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...password.input}
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={password.meta.touched && password.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Reset</Button>
    </form>
  );
};

export default ResetPasswordForm;
