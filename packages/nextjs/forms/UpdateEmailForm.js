import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_USER_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Button from '../components/Button';

const UpdateEmailForm = () => {
  const updateUser = useMutation(UPDATE_USER_MUTATION);
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async ({ email }, { setSubmitting }) => {
        await updateUser({
          variables: {
            updateEmailInput: {
              email,
            },
          },
        });
        setSubmitting(false);
      }}
      render={({
        values: { email },
        isSubmitting,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <Input
            id="email"
            label="Email"
            placeholder="Enter your new email"
            type="text"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            block
          >
            Update email
          </Button>
        </Form>
      )}
    />
  );
};

export default UpdateEmailForm;
