import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Billing = () => (
  <Account title="Billing">
    Billing information will go here.
  </Account>
);

export default withAuth(Billing);
