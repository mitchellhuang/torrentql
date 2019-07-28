import React from 'react';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdatePassword = () => (
  <Account>
    <h3 className="mb-3">Update password</h3>
    <UpdatePasswordForm/>
    <style jsx>{`
      .update-password {
        max-width: 350px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdatePassword);
