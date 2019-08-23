import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Frown, CheckCircle } from 'react-feather';
import { RESET_PASSWORD_MUTATION } from '../../apollo/mutations';
import Dashboard from '../../layouts/Dashboard';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import Card from '../../components/Card';

const states = {
  error: 'ERROR',
  form: 'FORM',
  success: 'SUCCESS',
};

const Error = () => (
  <div className="error">
    Sorry!
    <Frown size={20} className="icon" />
    Something went wrong. Please try to
    <a href="/reset_password"> reset again</a>.
    <style jsx>{`
      .error {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      a {
        margin-left: 5px;
      }
      .error :global(.icon) {
        margin: 0 5px;
      }
    `}</style>
  </div>
);

const Success = () => (
  <div className="success">
    You're all good to go! Password successfully reset.
    <a href="/login">Click here to login.</a>
    <CheckCircle size={20} color="green" />
    <style jsx>{`
      .success {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      a {
        margin: 0 5px;
      }
    `}</style>
  </div>
);

const ResetForm = ({ router }) => {
  const [status, setStatus] = useState(states.form);
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const onSubmit = async (data) => {
    try {
      await resetPassword({
        variables: {
          password: data.password1,
          key: router.query.hash,
        },
      });
      setStatus(states.success);
    } catch (e) {
      setStatus(states.error);
    }
  };
  return (
    <Dashboard title="reset-password">
      <Card>
        <div className="contents">
          {status === states.form && <>
            <div className="mb-3">Please enter a new password below.</div>
            <ResetPasswordForm onSubmit={onSubmit}/>
          </>}
          {status === states.success && <Success />}
          {status === states.error && <Error />}
        </div>
      </Card>
      <style jsx>{`
      .status {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    `}</style>
    </Dashboard>
  );
};

export default withRouter(ResetForm);
