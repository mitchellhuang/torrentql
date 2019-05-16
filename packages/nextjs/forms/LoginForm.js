import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';
import { adopt } from 'react-adopt';
import Input from '../components/Input';
import Button from '../components/Button';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Composed = adopt({
  apollo: ({ render }) => (
    <Mutation mutation={LOGIN}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  formik: ({ apollo, render }) => (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const result = await apollo.mutation({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
        const { data: { login: { token } } } = result;
        document.cookie = cookie.serialize('token', token);
        setSubmitting(false);
        Router.push('/dashboard');
      }}
    >
      {render}
    </Formik>
  ),
});

const LoginForm = () => (
  <Composed>
    {({ formik }) => {
      const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = formik;
      return (
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={values.password}
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
        </form>
      );
    }}
  </Composed>
);

export default LoginForm;
