import React from 'react';
import * as yup from 'yup';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation } from '@apollo/react-hooks';
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { validateSync } from '../lib/validate';
import { transformError } from '../lib/error';

const schema = yup.object().shape({
  email: yup
    .string()
    .email(),
});

const SendResetEmailForm = ({ onComplete }) => {
  const [sendPasswordResetEmail] = useMutation(SEND_PASSWORD_RESET_EMAIL_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ email }) => {
      try {
        await sendPasswordResetEmail({ variables: { email } });
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
      onComplete();
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
        placeholder="Enter your email"
        error={email.meta.touched && email.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Reset</Button>
    </form>
  );
};

export default SendResetEmailForm;
