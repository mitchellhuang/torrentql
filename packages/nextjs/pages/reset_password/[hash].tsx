import React from 'react';
import { withRouter } from 'next/router';
import { useMutation } from 'react-apollo-hooks';
import { RESET_PASSWORD_MUTATION } from '../../apollo/mutations';
import Dashboard from '../../layouts/Dashboard';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import Card from '../../components/Card';

const ResetForm = ({ router }) => {
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const onSubmit = async (x) => {
    try {
      console.log(x);
      await resetPassword({
        variables: {
          password: x.password1,
          key: router.query.hash,
        },
      });
      console.log('finished bro!');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dashboard title="reset-password">
      <Card>
        <ResetPasswordForm onSubmit={onSubmit}/>
      </Card>
      <style jsx>{`
      .reset-wrapper {
        display: flex;
        justify-content: center;
      }
    `}</style>
      I am going to reset this shit dawg. {router.query.hash}
    </Dashboard>
  );
}

export default withRouter(ResetForm);
