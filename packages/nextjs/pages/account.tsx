import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Button from '../components/Button';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';

const tabs = {
  UPDATE_EMAIL: 'update_email',
  UPDATE_PASSWORD: 'update_password',
  LOGOUT: 'logout',
};

const UpdateEmail = () => (
  <>
    <h3 className="mb-3">Update email</h3>
    <UpdateEmailForm/>
  </>
);

const UpdatePassword = () => (
  <>
    <h3 className="mb-3">Update password</h3>
    <UpdatePasswordForm/>
  </>
);

const Logout = () => (
  <>
    <h3 className="mb-3">Logout</h3>
    <Button href="/logout" block>
      Logout
    </Button>
  </>
);

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(tabs.UPDATE_EMAIL);
  return (
    <Dashboard title="Account" noFooter>
      <div className="container">
        <ul className="sidebar">
          <li className="tab" onClick={() => setSelectedTab(tabs.UPDATE_EMAIL)}>Update email</li>
          <li className="tab" onClick={() => setSelectedTab(tabs.UPDATE_PASSWORD)}>Update password</li>
          <li className="tab" onClick={() => setSelectedTab(tabs.LOGOUT)}>Logout</li>
        </ul>
        <div className="actions">
          <div className="selected-tab">
            {selectedTab === tabs.UPDATE_EMAIL && <UpdateEmail/>}
            {selectedTab === tabs.UPDATE_PASSWORD && <UpdatePassword/>}
            {selectedTab === tabs.LOGOUT && <Logout/>}
          </div>
        </div>
      </div>
      <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
      }
      .tab {
        font-size: 12pt;
        color: black;
        list-style-type: none;
        font-weight: 600;
        color: var(--gray);
        text-transform: uppercase;
      }
      .tab:not(:last-child) {
        margin-bottom: 15px;
      }
      .selected-tab {
        max-width: 600px;
        flex: 1;
      }
      .sidebar {
        padding: 15px;
        color: white;
        height: 100%;
        width: 200px;
        background-color: var(--white);
      }
      .actions {
        padding: 15px;
        display: flex;
        justify-content: center;
        flex: 1;
      }
    `}</style>
    </Dashboard>
  )
};

export default withAuth(Account);
