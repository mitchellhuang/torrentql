import React from 'react';
import { withRouter } from 'next/router';
import Dashboard from '../../layouts/Dashboard';
import ResetPasswordForm from '../../forms/ResetPasswordForm';
import Card from '../../components/Card';

const onSubmit = async (x) => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  console.log(x);
}

const ResetForm = ({ router }) => (
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

export default withRouter(ResetForm);
