import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import jsCookie from 'js-cookie';
import { LOGIN_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/error';

const LoginForm = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, { setSubmitting, setStatus }) => {
        try {
          const result = await login({
            variables: {
              email,
              password,
            },
          });
          const { data: { login: { token } } } = result as any;
          jsCookie.set('token', token, { expires: 365 });
          client.writeData({ data: { isLoggedIn: true } });
          setSubmitting(false);
          Router.push('/dashboard');
        } catch (err) {
          setStatus(transformErrors(err));
          setSubmitting(false);
        }
      }}
      render={({
        values: { email, password },
        status,
        isSubmitting,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={status && status.email}
          />
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={status && status.password}
          />
          <Error>{status && status.error}</Error>
          <Button
            type="submit"
            disabled={isSubmitting}
            block
          >
            Log in
          </Button>
        </Form>
      )}
    />
  );
};

export default LoginForm;
