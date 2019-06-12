import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import cookie from 'cookie';
import { LOGIN_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/transformErrors';

const LoginForm = () => {
  const login = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      initialStatus={{}}
      onSubmit={async ({ email, password }, { setSubmitting, setStatus }) => {
        try {
          const result = await login({
            variables: {
              email,
              password,
            },
          });
          const { data: { login: { token } } } = result;
          document.cookie = cookie.serialize('token', token);
          client.writeData({ data: { isLoggedIn: true } });
          setSubmitting(false);
          Router.push('/torrents');
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
            type="text"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={status.email}
          />
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={status.password}
          />
          <Error error={status.error} />
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
