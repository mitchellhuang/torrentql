import React from 'react';
import { Formik } from 'formik';
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
          <Button
            href="/forgot_password"
            disabled={isSubmitting}
            style={{ marginLeft: '10px' }}
            white
          >
            Forgot your password?
          </Button>
        </form>
      );
    }}
  </Formik>
);

export default LoginForm;
