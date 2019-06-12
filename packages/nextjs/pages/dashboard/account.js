import React from 'react';
import Dashboard from '../../layouts/Dashboard';
import Button from '../../components/Button';
import UpdateEmailForm from '../../forms/UpdateEmailForm';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';

const Account = () => (
  <Dashboard title="Account" noFooter>
    <div>
      <h3 className="mb-3">Update email</h3>
      <UpdateEmailForm />
      <h3 className="my-3">Update password</h3>
      <UpdatePasswordForm />
      <h3 className="my-3">Actions</h3>
      <Button href="/logout">
        Logout
      </Button>
    </div>
  </Dashboard>
);

export default Account;
