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
  url: '/dashboard/torrents',
}, {
  name: 'Downloads',
  url: '/dashboard/downloads',
}, {
  name: 'Account',
  url: '/dashboard/account',
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
        border-bottom: 1px solid #999;
      }
      li {
        float: left;
      }
      li a {
        display: block;
        color: var(--primary);
        font-size: 18px;
        font-weight: 600;
        padding: 10px 15px;
        border: 1px solid transparent;
        border-radius: 5px;
        margin-bottom: -1px;
      }
      li > .active {
        color: var(--black);
        border: 1px solid var(--gray);
        border-bottom-color: var(--white);
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
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
  <Global {...props}>
    <Head title={title} />
    <NavBar />
    <div className="wrapper wrapper-v">
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
        padding: 25px 0;
        height: 100%;
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
