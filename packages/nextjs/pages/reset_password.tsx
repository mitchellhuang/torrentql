import React, { useState } from 'react';
import { CheckCircle } from 'react-feather';
import Main from '../layouts/Main';
import Card from '../components/Card';
import ResetPasswordForm from '../forms/SendResetEmailForm';
import colors from '../lib/colors';

const ResetPassword = () => {
  const [generated, setGenerated] = useState(false);
  return (
    <Main title="Reset Password" backgroundColor={colors.dashboardBg} noFooter>
      <div className="reset-password">
        <Card title="Reset Password">
          {generated && <div className="generated">
            <p>
              <CheckCircle size={20} color="green" />
              <span className="ml-2">
                Check your email and follow the link to finish resetting your password.
              </span>
            </p>
          </div>}
          {!generated && <ResetPasswordForm onFinish={() => setGenerated(true)} />}
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
    </Main>
  );
};

export default ResetPassword;
