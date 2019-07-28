import React from 'react';
import UpdateEmailForm from '../../forms/UpdateEmailForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdateEmail = () => (
  <Account>
    <div className="update-email">
      <h3 className="mb-3">Update email</h3>
      <UpdateEmailForm/>
    </div>
    <style jsx>{`
      .update-email {
        max-width: 400px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdateEmail);
