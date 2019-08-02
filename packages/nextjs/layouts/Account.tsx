import React from 'react';
import Dashboard from './Dashboard';
import { Database, Lock, LogOut, Mail } from 'react-feather';
import { withRouter } from 'next/router';
import Card from '../components/Card';

const tabLinks = [
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
const Account = ({ children, router }) => (
  <Dashboard title="Account">
    <div className="container">
      <ul className="sidebar">
        {tabLinks.map(tabLink => (
          <li key={tabLink.url} className={router.pathname.includes(tabLink.url) ? 'selected' : null}>
            <a href={tabLink.url}>
              {tabLink.icon}
              <span className="tab-text ml-2">
              {tabLink.name}
            </span>
            </a>
          </li>
        ))}
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
        flex-direction: column;
      }
      span.bar {
        height: 22px;
        width: 3px;
      }
      .selected .bar {
        background-color: var(--black);
      }
      .selected a {
        color: var(--black);
      }
      li, .selected-tab {
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
      li:not(:last-child) {
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
        padding: 0;
        margin-top: 15px;
      }
      .help {
        padding: 0 15px;
      }
      @media(min-width: 768px) {
        .container {
          flex-direction: row;
        }
        .actions {
          margin-top: 0;
          padding: 0 15px;
        }
      }
    `}</style>
  </Dashboard>
);

export default withRouter(Account);
