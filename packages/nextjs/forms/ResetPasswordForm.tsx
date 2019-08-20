import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../components/Button';

const meetsRequiredStrength = value => /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.exec(value) !== null
  ? undefined
  : 'Must be at least 7 characters, and contain 1 letter and 1 number.';

// @ts-ignore
const ResetPasswordForm = ({ onSubmit }) => (
  <Form
    onSubmit={(x) => {
      onSubmit();
      console.log(x);
    }}
    validate={({ password1, password2 }) => {
      const errors = { password1: null, password2: null };
      if (!password1 || !password2) {
        errors.password1 = !password1 ? 'Required' : null;
        errors.password2 = !password2 ? 'Required' : null;
      } else if (password1 !== password2) {
        errors.password2 = 'Passwords must match!';
      }
      return errors;
    }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="password1" validate={meetsRequiredStrength}>
          {({ input, meta }) => (
            <div className="input-group">
              <input {...input}/>
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="password2" validate={meetsRequiredStrength}>
          {({ input, meta }) => (
            <div className="input-group">
              <input {...input}/>
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
