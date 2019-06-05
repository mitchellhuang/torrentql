import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Main from './Main';
import ToolBar from '../components/ToolBar';

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
        <Link href={item.url}>
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
        margin-right: 15px;
      }
      li a {
        display: block;
        font-size: 18px;
        font-weight: 600;
        padding: 10px;
        border-radius: 5px;
      }
      .active {
        background-color: var(--primary);
        color: var(--white);
      }
    `}</style>
  </ul>
);

const Dashboard = ({
  children,
  router,
  ...props
}) => (
  <Main {...props}>
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
      .tabs {
      }
      .content {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .main {
          flex-direction: row;
        }
        .tabs {
          flex: 1;
        }
        .content {
          flex: 3;
          margin-top: 0;
        }
      }
    `}</style>
  </Main>
);

export default withRouter(Dashboard);
