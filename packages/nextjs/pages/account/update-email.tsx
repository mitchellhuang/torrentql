import React from 'react';
import UpdateEmailForm from '../../forms/UpdateEmailForm';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const UpdateEmail = () => (
  <Account>
  <h3 className="text mb-3">Update email</h3>
    <div className="update-email">
      <UpdateEmailForm/>
    </div>
    <style jsx>{`
      .text {
        display: flex;
        text-align: left;
      }
      .update-email {
        max-width: 400px;
        margin: 0 auto;
      }
    `}</style>
  </Account>
);

export default withAuth(UpdateEmail);
