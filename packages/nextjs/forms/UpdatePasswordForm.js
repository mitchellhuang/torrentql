import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_USER_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';

const UpdatePasswordForm = () => {
  const updateUser = useMutation(UPDATE_USER_MUTATION);
  return (
    <Formik
      initialValues={{ oldPassword: '', password: '' }}
      onSubmit={async ({ oldPassword, password }, { setSubmitting }) => {
        await updateUser({
          variables: {
            updatePasswordInput: {
              oldPassword,
              password,
            },
          },
        });
        setSubmitting(false);
      }}
      render={({
        values: { oldPassword, password },
        isSubmitting,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <Input
            id="oldPassword"
            label="Old password"
            placeholder="Enter your old password"
            type="password"
            value={oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id="password"
            label="New password"
            placeholder="Enter your new password"
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
            Update password
          </Button>
        </Form>
      )}
    />
  );
};

export default UpdatePasswordForm;
