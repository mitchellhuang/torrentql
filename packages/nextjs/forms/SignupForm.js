import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import cookie from 'cookie';
import { CREATE_USER_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupForm = () => {
  const createUser = useMutation(CREATE_USER_MUTATION);
  const client = useApolloClient();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        const result = await createUser({
          variables: {
            email,
            password,
          },
        });
        const { data: { createUser: { token } } } = result;
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
            Sign up
          </Button>
        </Form>
      )}
    />
  );
};

export default SignupForm;
