import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../components/Button';

const meetsRequiredStrength = value => /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.exec(value) !== null
  ? undefined
  : 'Must be at least 7 characters, and contain 1 letter and 1 number.';

const ResetPasswordForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="password1" validate={meetsRequiredStrength}>
          {({ input, meta }) => (
            <div className="input-group">
              <input {...input} type="password1"/>
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="password1" validate={meetsRequiredStrength}>
          {({ input, meta }) => (
            <div className="input-group">
              <input {...input} type="password2"/>
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
