import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Api = () => (
  <Account title="API Keys">
    API keys will go here.
  </Account>
);

export default withAuth(Api);
