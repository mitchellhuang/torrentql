import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../components/Button';
import Input from '../components/Input';

const isLongEnough = value => value && value.length >= 8 ? undefined : 'Must be at least 8 characters long.';

const ResetPasswordForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={({ password1, password2 }) => {
      const errors = { password1: null, password2: null };
      if (!password1 || !password2) {
        errors.password1 = !password1 ? 'Required' : null;
        errors.password2 = !password2 ? 'Required' : null;
      } else if (password1 !== password2) {
        errors.password2 = 'Passwords must match!';
      }
      return (errors.password1 === null && errors.password2 === null) ? null : errors;
    }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="password1" validate={isLongEnough}>
          {({ input, meta }) => (
            <div className="input-group">
              <Input {...input} type="password" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="password2" validate={isLongEnough}>
          {({ input, meta }) => (
            <div className="input-group">
              <Input {...input} type="password" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Button type="submit" block>Update</Button>
        <style jsx>{`
          .input-group {
            margin-bottom: 15px;
          }
          .input-group input {
            width: 100%;
          }
        `}</style>
      </form>
    )} />
);

export default ResetPasswordForm;
