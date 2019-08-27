import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { CheckCircle } from 'react-feather';
import Main from '../../layouts/Main';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import Card from '../../components/Card';
import colors from '../../lib/colors';

const ResetForm = ({ router }) => {
  const [success, setSuccess] = useState(false);
  return (
    <Main title="Reset Password" backgroundColor={colors.dashboardBg} noFooter>
      <div className="reset-password">
        <Card title="Reset Password">
          <div className="contents">
            {!success && <ResetPasswordForm secret={router.query.secret} onFinish={() => setSuccess(true)} />}
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
    </Main>
  );
};

export default withRouter(ResetForm);
