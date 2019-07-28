import React from 'react';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdatePassword = () => (
  <Account>
    <div className="update-password">
      <h3 className="mb-3">Update password</h3>
      <UpdatePasswordForm/>
    </div>
    <style jsx>{`
      .update-password {
        max-width: 400px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdatePassword);
