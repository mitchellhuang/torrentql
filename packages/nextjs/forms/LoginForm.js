import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    }}
  >
    {(props) => {
      const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
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
            Login
          </Button>
          <span style={{ marginLeft: '10px' }}>
            Need an account? <Link href="/signup"><a>Signup</a></Link>
          </span>
        </form>
      );
    }}
  </Formik>
);

export default LoginForm;
