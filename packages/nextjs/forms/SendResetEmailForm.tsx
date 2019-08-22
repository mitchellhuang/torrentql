import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../components/Button';

const SendResetEmailForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Field name="email" component="input" placeholder="Enter your email" />
        </div>
        <Button type="submit" block>Reset</Button>
        <style jsx>{`
          .input-wrapper :global(input) {
            width: 100%;
            margin-bottom: 15px;
          }
        `}</style>
      </form>
  )} />
);

export default SendResetEmailForm;
