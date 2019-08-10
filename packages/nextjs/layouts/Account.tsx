import React from 'react';
import Dashboard from './Dashboard';
import { Home, CreditCard, PieChart, Lock, LogOut, Mail } from 'react-feather';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Card from '../components/Card';

const items = [
  {
    url: '/account',
    name: 'Account',
    icon: <Home />,
  },
  {
    url: '/account/billing',
    name: 'Billing',
    icon: <CreditCard />,
  },
  {
    url: '/account/usage',
    name: 'Usage',
    icon: <PieChart />,
  },
  {
    url: '/account/email',
    name: 'Update Email',
    icon: <Mail />,
  },
  {
    url: '/account/password',
    name: 'Update Password',
    icon: <Lock />,
  },
  {
    url: '/logout',
    name: 'Logout',
    icon: <LogOut />,
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
      <Card className="sidebar">
        <ul>
          {items.map(item => (
            <li key={item.url} className={router.pathname === item.url && 'selected'}>
              <a href={item.url}>
                {item.icon}
                <span className="tab-text ml-2">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Card>
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
      .selected a {
        color: var(--black);
      }
      .container :global(.sidebar) {
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
        font-weight: 600;
        display: flex;
        align-items: center;
        color: var(--primary);
        font-size: 16px;
      }
      @media(min-width: 768px) {
        .container {
          flex-direction: row;
        }
        .container :global(.sidebar) {
          min-width: 200px;
          margin-right: 10px;
          margin-bottom: 0;
        }
      }
    `}</style>
  </Dashboard>
);

export default withRouter(Account);
