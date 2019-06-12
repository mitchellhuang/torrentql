import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_USER_PASSWORD_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/transformErrors';

const UpdatePasswordForm = () => {
  const updateUser = useMutation(UPDATE_USER_PASSWORD_MUTATION);
  return (
    <Formik
      initialValues={{ oldPassword: '', password: '' }}
      onSubmit={async ({ oldPassword, password }, { setSubmitting, setStatus }) => {
        try {
          await updateUser({
            variables: {
              oldPassword,
              password,
            },
          });
          setSubmitting(false);
        } catch (err) {
          setStatus(transformErrors(err));
          setSubmitting(false);
        }
      }}
      render={({
        values: { oldPassword, password },
        status,
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
            errors={status && status.oldPassword}
          />
          <Input
            id="password"
            label="New password"
            placeholder="Enter your new password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={status && status.password}
          />
          <Error error={status && status.error} />
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
