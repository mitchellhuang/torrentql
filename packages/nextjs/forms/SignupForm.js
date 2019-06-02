import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import cookie from 'cookie';
import Input from '../components/Input';
import Button from '../components/Button';

const SIGNUP_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
    }
  }
`;

const SignupForm = () => {
  const signup = useMutation(SIGNUP_MUTATION);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        const result = await signup({
          variables: {
            email,
            password,
          },
        });
        const { data: { createUser: { token } } } = result;
        document.cookie = cookie.serialize('token', token);
        setSubmitting(false);
        Router.push('/dashboard');
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
