import React from 'react';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Password = () => (
  <Account title="Update Password">
    <UpdatePasswordForm/>
  </Account>
);

export default withAuth(Password);
