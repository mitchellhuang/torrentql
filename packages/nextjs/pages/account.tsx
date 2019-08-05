import React from 'react';
import Layout from '../layouts/Account';
import withAuth from '../lib/withAuth';

const Account = () => (
  <Layout title="Account">
    Account information will go here.
  </Layout>
);

export default withAuth(Account);
