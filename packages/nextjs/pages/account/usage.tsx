import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Usage = () => (
  <Account title="Usage">
    <div>
      Usage information will go here.
    </div>
  </Account>
);

export default withAuth(Usage);
