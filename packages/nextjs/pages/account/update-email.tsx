import React from 'react';
import UpdateEmailForm from '../../forms/UpdateEmailForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdateEmail = () => (
  <Account>
    <h3 className="mb-3">Update email</h3>
    <UpdateEmailForm/>
    <style jsx>{`
      .update-email {
        max-width: 350px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdateEmail);
