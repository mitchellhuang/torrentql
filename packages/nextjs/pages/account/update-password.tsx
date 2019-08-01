import React from 'react';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdatePassword = () => (
  <Account>
  <h3 className="text mb-3">Update password</h3>

    <div className="update-password">
      <UpdatePasswordForm/>
    </div>
    <style jsx>{`
      .text {

      }
      .update-password {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdatePassword);
