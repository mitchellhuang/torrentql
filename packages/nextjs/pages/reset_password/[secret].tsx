import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { CheckCircle } from 'react-feather';
import Dashboard from '../../layouts/Dashboard';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import Card from '../../components/Card';

const ResetForm = ({ router }) => {
  const [success, setSuccess] = useState(false);
  return (
    <Dashboard title="Reset Password">
      <div className="reset-password">
        <Card title="Reset Password">
          <div className="contents">
            {!success && <ResetPasswordForm secret={router.query.secret} onComplete={() => setSuccess(true)} />}
            {success && (
              <p>
                <CheckCircle size={20} color="green" />
                <span className="ml-2">You have successfully reset your password.</span>
              </p>
              )}
          </div>
        </Card>
      </div>
      <style jsx>{`
        @media(min-width: 768px) {
          .reset-password {
            margin: 0 auto;
            align-items: center;
            max-width: 350px;
            padding: 50px 0;
          }
        }
      `}</style>
    </Dashboard>
  );
};

export default withRouter(ResetForm);
