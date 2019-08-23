import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Dashboard from '../layouts/Dashboard';
import Card from '../components/Card';
import ResetPasswordForm from '../forms/SendResetEmailForm';
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from '../apollo/mutations';
import { CheckCircle } from 'react-feather';

const ResetPassword = () => {
  const [generated, setGenerated] = useState(false);
  const [sendPasswordResetEmail] = useMutation(SEND_PASSWORD_RESET_EMAIL_MUTATION);
  return (
    <Dashboard title="reset_password">
      <div className="reset-wrapper">
        <Card>
          {generated && <div className="generated">
            <CheckCircle size={20} color="green" className="check-icon" />
            You did it! Check your email and follow the link to finish resetting your password.
          </div>}
          {!generated && <h3 className="mb-3">Reset your password</h3>}
          {!generated && <ResetPasswordForm onSubmit={async ({ email }) => {
            await sendPasswordResetEmail({
              variables: { email },
            });
            setGenerated(true);
          }}/>}
        </Card>
      </div>
      <style jsx>{`
        .reset-wrapper {
          display: flex;
          justify-content: center;
        }
        .generated {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .generated :global(.check-icon) {
          margin-right: 5px;
        }
      `}</style>
    </Dashboard>
  );
};

export default ResetPassword;
