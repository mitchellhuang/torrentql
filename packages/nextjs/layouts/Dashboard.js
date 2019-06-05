import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Global from './Global';
import Head from '../components/Head';
import ToolBar from '../components/ToolBar';
import NavBar from '../components/NavBar';

const tabs = [{
  name: 'Torrents',
  url: '/torrents',
}, {
  name: 'Downloads',
  url: '/downloads',
}, {
  name: 'Settings',
  url: '/settings',
}];

const Tabs = ({
  router,
}) => (
  <ul>
    { tabs.map(item => (
      <li key={item.url}>
        <Link prefetch href={item.url}>
          <a className={router.pathname === item.url ? 'active' : null}>
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
      }
      li a {
        display: block;
        color: var(--black);
        font-size: 18px;
        font-weight: 600;
        padding: 10px 0;
        border-radius: 5px;
      }
      li > .active {
        color: #2d70b6;
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
  <Global backgroundColor="#e3e8ee" {...props}>
    <Head title={title} />
    <NavBar />
    <div className="wrapper">
      <ToolBar />
      <div className="main">
        <div className="tabs">
          <Tabs router={router} />
        </div>
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
        background-color: var(--white);
        border-radius: 5px;
        padding: 15px;
        margin-top: 15px;
        height: 100%;
      }
      @media(min-width: 768px) {
        .main {
          flex-direction: row;
        }
        .tabs {
          flex: 1;
        }
        .content {
          flex: 4;
          margin-top: 0;
        }
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
