import React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_EMAIL_MUTATION } from '../apollo/mutations';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import transformErrors from '../lib/error';

const UpdateEmailForm = () => {
  const [updateUserEmail] = useMutation(UPDATE_USER_EMAIL_MUTATION);
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async ({ email }, { setSubmitting, setStatus }) => {
        try {
          await updateUserEmail({
            variables: {
              email,
            },
          });
          setSubmitting(false);
        } catch (err) {
          setStatus(transformErrors(err));
          setSubmitting(false);
        }
      }}
      render={({
        values: { email },
        status,
        isSubmitting,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <Input
            id="email"
            label="Email"
            placeholder="Enter your new email"
            type="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={status && status.email}
          />
          <Error>{status && status.error}</Error>
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
