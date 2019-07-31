import React from 'react';
import Dashboard from './Dashboard';
import { Database, Lock, LogOut, Mail } from 'react-feather';
import { withRouter } from 'next/router';
import Card from '../components/Card';

const urls = {
  USAGE: {
    url: '/account/usage',
    icon: <Database />,
    text: 'Usage',
  },
  UPDATE_EMAIL: {
    url: '/account/update_email',
    icon: <Mail />,
    text: 'Update email',
  },
  UPDATE_PASSWORD: {
    url: '/account/update_password',
    icon: <Lock />,
    text: 'Update password',
  },
  LOGOUT: {
    url: '/account/logout',
    icon: <LogOut/>,
    text: 'Logout',
  },
};

const Account = ({ children, router }) => {
  return (
    <Dashboard title="Account">
      <div className="container">
        <ul className="sidebar">
          {Object.keys(urls).map(key => (
            <li className={`tab ${router.pathname.includes(urls[key].url) ? 'active' : ''}`}>
              <a href={urls[key].url}>
                {urls[key].icon}
                <span className="tab-text ml-2">{urls[key].text}</span>
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
        .tab {
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
};

export default withRouter(Account);
