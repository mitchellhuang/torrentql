import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import cookie from 'cookie';
import Input from '../components/Input';
import Button from '../components/Button';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginForm = () => {
  const login = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
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
      }}
      render={({
        values: { email, password },
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
          />
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
