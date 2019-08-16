import React from 'react';
import Layout from '../layouts/Account';
import withAuth from '../lib/withAuth';
import Card from '../components/Card';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';

const Account = () => (
  <Layout title="Account">
    <Card title="Account" className="mb-3">
      Account information will go here.
    </Card>
    <Card title="Update Email" className="mb-3">
      <UpdateEmailForm />
    </Card>
    <Card title="Update Password">
      <UpdatePasswordForm />
    </Card>
  </Layout>
);

export default withAuth(Account);
