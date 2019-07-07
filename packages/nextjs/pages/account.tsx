import React from 'react';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Button from '../components/Button';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';

const Account = () => (
  <Dashboard title="Account" noFooter>
    <div className="account">
      <div className="panel update-email">
        <h3 className="mb-3">Update email</h3>
        <UpdateEmailForm />
      </div>
      <div className="panel update-password">
        <h3 className="mb-3">Update password</h3>
        <UpdatePasswordForm />
      </div>
      <div className="panel actions">
        <h3 className="mb-3">Actions</h3>
        <Button href="/logout" block>
          Logout
        </Button>
      </div>
    </div>
    <style jsx>{`
      .account {
        display: flex;
        flex-direction: column;
      }
      .panel:not(:last-child) {
        margin-bottom: 15px;
      }
      @media(min-width: 768px) {
        .account {
          flex-direction: row;
        }
        .panel {
          flex: 1;
        }
        .panel:not(:last-child) {
          margin-right: 15px;
          margin-bottom: 0;
        }
      }
    `}</style>
  </Dashboard>
);

export default withAuth(Account);
