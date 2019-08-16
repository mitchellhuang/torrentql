import React from 'react';
import Layout from '../layouts/Account';
import withAuth from '../lib/withAuth';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';

const Account = () => (
  <Layout title="Account">
    Account information will go here.
    <div className="mb-3" />
    <UpdateEmailForm />
    <div className="mb-3" />
    <UpdatePasswordForm />
  </Layout>
);

export default withAuth(Account);
