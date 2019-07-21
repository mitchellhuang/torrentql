import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Global from './Global';
import Head from '../components/Head';
import NavBar from '../components/NavBar';

const tabs = [{
  name: 'Home',
  url: '/dashboard',
}, {
  name: 'Torrents',
  url: '/torrents',
}, {
  name: 'Downloads',
  url: '/downloads',
}, {
  name: 'Account',
  url: '/account',
}];

const Tabs = ({ router }) => (
  <div className="tabs wrapper">
    <ul>
      {tabs.map(item => (
        <li key={item.url}>
          <Link href={item.url}>
            <a className={router.pathname === item.url ? 'active' : undefined}>
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      .tabs {
        padding: 5px 5px 0 5px;
      }
      ul {
        display: block;
        list-style-type: none;
        padding: 0;
        margin: 0;
        overflow: auto;
        white-space: nowrap;
      }
      li {
        display: inline-block;
      }
      li a {
        display: block;
        color: var(--primary);
        font-size: 16px;
        font-weight: 600;
        padding: 10px 15px;
        border: 1px solid transparent;
        margin-bottom: -1px;
      }
      li > .active {
        color: var(--black);
        border-bottom: 2px solid var(--gray);
      }
      @media(min-width: 768px) {
        ul {
          overflow: visible;
        }
      }
    `}</style>
  </div>
);

const Dashboard = ({
  children,
  router,
  title,
  ...props
}) => (
  <Global backgroundColor="var(--dashboardBg)" {...props}>
    <Head title={title} />
    <NavBar />
    <div className="tabs">
      <Tabs router={router} />
    </div>
    <div className="wrapper">
      <div className="main">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
    <style jsx>{`
      .main {
        display: flex;
        flex-direction: column;
      }
      .tabs {
        border-top: 1px solid var(--gray);
        background-color: white;
        box-shadow: 0 5px 10px rgba(0,0,0,0.12);
      }
      .content {
        border-radius: 5px;
        overflow: auto;
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
