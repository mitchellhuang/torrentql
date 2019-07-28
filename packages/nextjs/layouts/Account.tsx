import React from 'react';
import Dashboard from './Dashboard';
import { Database, Lock, LogOut, Mail } from 'react-feather';
import Card from '../components/Card';

const Account = ({ children }) => (
  <Dashboard title="Account">
    <div className="container">
      <ul className="sidebar">
        <li className="tab">
          <Database/>
          <a href="/account/usage" className="ml-2">Usage</a>
        </li>
        <li className="tab">
          <Mail/>
          <a href="/account/update-email" className="ml-2">Update email</a>
        </li>
        <li className="tab">
          <Lock/>
          <a href="/account/update-password" className="ml-2">Update password</a>
        </li>
        <li className="tab">
          <LogOut/>
          <a href="/account/logout" className="ml-2">Logout</a>
        </li>
      </ul>
      <div className="actions">
        <Card className="selected-tab">
          {children}
        </Card>
      </div>
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
      color: var(--black);
      text-transform: uppercase;
    }
    .tab:hover, a {
     color: var(--darkGray);
    }
    .tab:not(:last-child) {
      margin-bottom: 15px;
    }
    .container :global(.selected-tab) {
      flex: 1;
    }
    .sidebar {
      padding: 0 15px;
      margin: 0;
      height: 100%;
      width: 25%;
    }
    .actions {
      display: flex;
      justify-content: center;
      flex: 1;
      padding: 0 15px;
      width: 75%;
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
);

export default Account;
