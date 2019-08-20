import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';

const Billing = () => (
  <Account title="Billing">
    <Card title="Billing">
      Billing information will go here.
    </Card>
  </Account>
);

export default withAuth(Billing);
