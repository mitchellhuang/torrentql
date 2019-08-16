import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';

const Api = () => (
  <Account title="API Keys">
    <Card title="API Keys" className="mb-3">
      API keys will go here.
    </Card>
  </Account>
);

export default withAuth(Api);
