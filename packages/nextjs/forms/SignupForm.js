import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import Input from '../components/Input';
import Button from '../components/Button';

const SIGNUP = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

const Composed = adopt({
  apollo: ({ render }) => (
    <Mutation mutation={SIGNUP}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  formik: ({ apollo, render }) => (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        await apollo.mutation({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
        setSubmitting(false);
      }}
    >
      {render}
    </Formik>
  ),
});

const SignupForm = () => (
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
          >
            Sign up
          </Button>
          <span style={{ marginLeft: '10px' }}>
            Have an account? <Link href="/login"><a>Log in.</a></Link>
          </span>
        </form>
      );
    }}
  </Composed>
);

export default SignupForm;
