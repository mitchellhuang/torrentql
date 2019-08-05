import React from 'react';
import UpdateEmailForm from '../../forms/UpdateEmailForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Email = () => (
  <Account title="Update Email">
    <UpdateEmailForm/>
  </Account>
);

export default withAuth(Email);
