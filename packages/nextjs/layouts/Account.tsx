import React from 'react';
import Dashboard from './Dashboard';
import { Database, Lock, LogOut, Mail } from 'react-feather';
import { withRouter } from 'next/router';
import Card from '../components/Card';

const urls = {
  USAGE: '/account/usage',
  UPDATE_EMAIL: '/account/update-email',
  UPDATE_PASSWORD: '/account/update-password',
  LOGOUT: '/account/logout',
};

const Account = ({ children, router }) => {
  return (
    <Dashboard title="Account">
      <div className="container">
        <ul className="sidebar">
          <li className={`tab ${router.pathname.includes(urls.USAGE) ? 'active' : ''}`}>
            <a href={urls.USAGE}>
              <Database/>
              <span className="tab-text ml-2">Usage</span>
            </a>
          </li>
          <li className={`tab ${router.pathname.includes(urls.UPDATE_EMAIL) ? 'active' : ''}`}>
            <a href={urls.UPDATE_EMAIL}>
              <Mail/>
              <span className="tab-text ml-2">Update email</span>
            </a>
          </li>
          <li className={`tab ${router.pathname.includes(urls.UPDATE_PASSWORD) ? 'active' : ''}`}>
            <a href={urls.UPDATE_PASSWORD}>
              <Lock/>
              <span className="tab-text ml-2">Update password</span>
            </a>
          </li>
          <li className={`tab ${router.pathname.includes(urls.LOGOUT) ? 'active' : ''}`}>
            <a href={urls.LOGOUT}>
              <LogOut/>
              <span className="tab-text ml-2">Logout</span>
            </a>
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
        span.bar {
          height: 22px;
          width: 3px;
        }
        .active .bar {
          background-color: var(--black);
        }
        .active a {
          color: var(--black);
        }
        .tab, .selected-tab {
          display: flex;
          flex-direction: row;
          color: black;
          list-style-type: none;
        }
        a {
          text-transform: capitalize;
          font-weight: 600;
          display: flex;
          align-items: center;
          color: var(--primary);
          font-size: 12pt;
        }
        .tab:not(:last-child) {
          margin-bottom: 15px;
        }
        .container :global(.selected-tab) {
          flex: 1;
        }
        .sidebar {
          padding: 0;
          margin: 0;
          height: 100%;
        }
        .actions {
          display: flex;
          justify-content: center;
          flex: 5;
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
  );
};

export default withRouter(Account);
