import React from 'react';
import Dashboard from './Dashboard';
import { Home, CreditCard, PieChart, Lock, LogOut } from 'react-feather';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Card from '../components/Card';

const items = [
  {
    url: '/account',
    name: 'Account',
    icon: <Home size={18} />,
  },
  {
    url: '/account/billing',
    name: 'Billing',
    icon: <CreditCard size={18} />,
  },
  {
    url: '/account/usage',
    name: 'Usage',
    icon: <PieChart size={18} />,
  },
  {
    url: '/account/api',
    name: 'API Keys',
    icon: <Lock size={18} />,
  },
  {
    url: '/logout',
    name: 'Logout',
    icon: <LogOut size={18} />,
  },
];

interface IAccount extends React.HTMLProps<HTMLDivElement> {
  title: string;
}

const Account: React.FunctionComponent<IAccount & WithRouterProps> = ({
  title,
  children,
  router,
}) => (
  <Dashboard title={title}>
    <div className="container">
      <div className="sidebar">
        <ul>
          {items.map(item => (
            <li key={item.url} className={router.pathname === item.url && 'selected'}>
              <a href={item.url}>
                {item.icon}
                <span className="tab-text">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Card title={title} className="content">
        {children}
      </Card>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .sidebar {
        margin-bottom: 15px;
        height: 100%;
      }
      .container :global(.content) {
        flex: 1;
      }
      li:not(:last-child) {
        margin-bottom: 15px;
      }
      a {
        text-transform: capitalize;
        display: flex;
        align-items: center;
        color: var(--lightBlack);
        font-size: 16px;
      }
      .selected a {
        color: var(--primary);
        font-weight: 600;
      }
      .tab-text {
        margin-left: 15px;
      }
      @media(min-width: 768px) {
        .container {
          flex-direction: row;
        }
        .sidebar {
          min-width: 200px;
          margin-right: 10px;
          margin-bottom: 0;
        }
      }
      @media(min-width: 1024px) {
        .sidebar {
          min-width: 250px;
        }
      }
    `}</style>
  </Dashboard>
);

export default withRouter(Account);
