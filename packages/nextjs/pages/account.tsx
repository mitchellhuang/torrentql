import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../layouts/Account';
import withAuth from '../lib/withAuth';
import { ME_QUERY } from '../apollo/queries';
import Card from '../components/Card';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';
import { LoadingState } from '../components/State';

const Account = () => {
  const { loading, data } = useQuery(ME_QUERY);
  const me = data && data.me;
  if (loading) {
    return (
      <Layout title="Account">
        <Card title="Account">
          <LoadingState />
        </Card>
      </Layout>
    );
  }
  return (
    <Layout title="Account">
      <Card title="Account" className="mb-3">
        {JSON.stringify(me)}
      </Card>
      <Card title="Update Email" className="mb-3">
        <UpdateEmailForm />
      </Card>
      <Card title="Update Password">
        <UpdatePasswordForm />
      </Card>
    </Layout>
  );
};

export default withAuth(Account);
