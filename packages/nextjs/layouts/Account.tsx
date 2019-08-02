import React from 'react';
import Dashboard from './Dashboard';
import { Database, Lock, LogOut, Mail } from 'react-feather';
import { withRouter } from 'next/router';
import Card from '../components/Card';

const urls = [
  {
    url: '/account/usage',
    name: 'Usage',
    icon: <Database />,
  },
  {
    url: '/account/update-email',
    name: 'Update email',
    icon: <Mail />,
  },
  {
    url: '/account/update-password',
    name: 'Update password',
    icon: <Lock />,
  },
  {
    url: '/account/logout',
    name: 'Logout',
    icon: <LogOut />,
  },
];
const Account = ({ children, router }) => {
  return (
    <Dashboard title="Account">
      <div className="container">
        <ul className="sidebar">
        {urls.map(url => (
          <li key={url.url} className={`tab ${router.pathname.includes(url.url) ? 'active' : ''}`}>
          <a href={url.url}>
            {url.icon}
            <span className="tab-text ml-2">{url.name}</span>
          </a>
        </li>))}
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
