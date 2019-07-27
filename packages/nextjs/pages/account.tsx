import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import Button from '../components/Button';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';
import { Database, Mail, Lock, LogOut } from 'react-feather';
import Card from '../components/Card';

const actions = {
  USAGE: 'usage',
  UPDATE_EMAIL: 'update_email',
  UPDATE_PASSWORD: 'update_password',
  LOGOUT: 'logout',
};

const Usage = () => (
  <>
    <h3 className="mb-3">Usage</h3>
    <div className="container">
      <Card>
        Data transfer out
        <img src="https://cloud.google.com/billing/docs/images/billing-reports3.png" alt="Cloud report"/>
      </Card>
      <Card>
        Storage
        <img src="https://cloud.google.com/billing/docs/images/billing-reports3.png" alt="Cloud report"/>
      </Card>
    </div>
    <style jsx>{`
      .container {
        display: flex;
      }
      .container div {
        flex: 1;
      }
      img {
        width: 100%;
      }
    `}</style>
  </>
);

const UpdateEmail = () => (
  <Card>
    <h3 className="mb-3">Update email</h3>
    <UpdateEmailForm/>
  </Card>
);

const UpdatePassword = () => (
  <Card>
    <h3 className="mb-3">Update password</h3>
    <UpdatePasswordForm/>
  </Card>
);

const Logout = () => (
  <Card>
    <h3 className="mb-3">Logout</h3>
    <Button href="/logout" block>
      Logout
    </Button>
  </Card>
);

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(actions.USAGE);
  return (
    <Dashboard title="Account">
      <div className="container">
        <ul className="sidebar">
          <li className="tab" onClick={() => setSelectedTab(actions.USAGE)}>
            <Database/>
            <span className="ml-2">Usage</span>
          </li>
          <li className="tab" onClick={() => setSelectedTab(actions.UPDATE_EMAIL)}>
            <Mail/>
            <span className="ml-2">Update email</span>
          </li>
          <li className="tab" onClick={() => setSelectedTab(actions.UPDATE_PASSWORD)}>
            <Lock/>
            <span className="ml-2">Update password</span>
          </li>
          <li className="tab" onClick={() => setSelectedTab(actions.LOGOUT)}>
            <LogOut/>
            <span className="ml-2">Logout</span>
          </li>
        </ul>
        <div className="actions">
          <div className="selected-tab">
            {selectedTab === actions.USAGE && <Usage/>}
            {selectedTab === actions.UPDATE_EMAIL && <UpdateEmail/>}
            {selectedTab === actions.UPDATE_PASSWORD && <UpdatePassword/>}
            {selectedTab === actions.LOGOUT && <Logout/>}
          </div>
        </div>
        {selectedTab !== actions.USAGE && <div className="help">
          <h3 className="mb-3">Make TQL better</h3>
          <a href="www.google.com">Give us feedback</a>
        </div>}
      </div>
      <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
      }
      .tab {
        display: flex;
        align-items: center;
        font-size: 12pt;
        color: black;
        list-style-type: none;
        font-weight: 600;
        cursor: pointer;
        color: var(--black);
        text-transform: uppercase;
      }
      .tab:hover {
       color: var(--darkGray);
      }
      .tab:not(:last-child) {
        margin-bottom: 15px;
      }
      :global(.selected-tab) {
        flex: 1;
      }
      .sidebar {
        padding: 0 15px;
        margin: 0;
        height: 100%;
      }
      .actions {
        display: flex;
        justify-content: center;
        flex: 1;
        padding: 0 15px;
      }
      .help {
        padding: 0 15px;
      }
      @media(max-width: 767px) {
        .container {
          flex-direction: column;
        }
        .actions {
          padding: 0;
        }
        .actions, .help {
          margin-top: 15px;
        }
      }
    `}</style>
    </Dashboard>
  )
};

export default withAuth(Account);
