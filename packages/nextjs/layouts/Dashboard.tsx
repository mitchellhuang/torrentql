import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Global from './Global';
import Head from '../components/Head';
import ToolBar from '../components/ToolBar';
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

const Tabs = ({
  router,
}) => (
  <ul>
    { tabs.map(item => (
      <li key={item.url}>
        <Link prefetch href={item.url}>
          <a className={router.pathname === item.url ? 'active' : undefined}>
            {item.name}
          </a>
        </Link>
      </li>
    )) }
    <style jsx>{`
      ul {
        display: block;
        list-style-type: none;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid var(--gray);
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
        background: var(--dashboardBg);
        border-color: var(--gray);
        border-radius: 5px 5px 0 0;
        border-bottom-color: var(--dashboardBg);
      }
      @media(min-width: 768px) {
        ul {
          overflow: visible;
        }
      }
    `}</style>
  </ul>
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
    <div className="wrapper">
      <ToolBar />
      <div className="main">
        <Tabs router={router} />
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
      .content {
        border-radius: 5px;
        padding-top: 15px;
        overflow: auto;
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
