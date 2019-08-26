import React from 'react';
import Router from 'next/router';
import * as yup from 'yup';
import jsCookie from 'js-cookie';
import { FORM_ERROR } from 'final-form';
import { useForm, useField } from 'react-final-form-hooks';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '../apollo/mutations';
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
  password: yup
    .string()
    .required()
    .min(8),
});

const LoginForm = () => {
  const client = useApolloClient();
  const [login] = useMutation(LOGIN_MUTATION);
  const { form, handleSubmit, pristine, submitting, submitError } = useForm({
    onSubmit: async ({ email, password }) => {
      try {
        const result = await login({ variables: { email, password } });
        const { data: { login: { token } } } = result as any;
        jsCookie.set('token', token, { expires: 365 });
        client.writeData({ data: { isLoggedIn: true } });
        Router.push('/dashboard');
      } catch (error) {
        return {
          [FORM_ERROR]: transformError(error),
        };
      }
    },
    validate: values => validateSync(schema, values),
  });
  const email = useField('email', form);
  const password = useField('password', form);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...email.input}
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={email.meta.touched && email.meta.error}
      />
      <Input
        {...password.input}
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={password.meta.touched && password.meta.error}
      />
      {submitError && <Error className="mb-3">{submitError}</Error>}
      <Button type="submit" disabled={pristine || submitting} block>Log in</Button>
    </form>
  );
};

export default LoginForm;
