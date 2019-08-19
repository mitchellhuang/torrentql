import React from 'react';
import Link from 'next/link';
import Dashboard from './Dashboard';
import { Home, CreditCard, PieChart, Lock, LogOut } from 'react-feather';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const items = [
  {
    url: '/account',
    name: 'Account',
    icon: Home,
  },
  {
    url: '/account/billing',
    name: 'Billing',
    icon: CreditCard,
  },
  {
    url: '/account/usage',
    name: 'Usage',
    icon: PieChart,
  },
  {
    url: '/account/api',
    name: 'API Keys',
    icon: Lock,
  },
  {
    url: '/logout',
    name: 'Logout',
    icon: LogOut,
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
              <Link href={item.url}>
                <a>
                  <item.icon size={18} />
                  <span className="tab-text">
                    {item.name}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
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
      .content {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      li:not(:last-child) {
        margin-bottom: 10px;
      }
      a {
        text-transform: capitalize;
        display: flex;
        align-items: center;
        color: var(--light-black);
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
          margin-right: 15px;
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
