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
  <div className="tabs">
    <div className="wrapper">
    <ul>
      {tabs.map(item => (
        <li key={item.url}>
          <Link href={item.url}>
            <a className={router.pathname.includes(item.url) ? 'active' : undefined}>
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
    </div>
    <style jsx>{`
      .tabs {
        background-color: white;
        box-shadow: #fff 0 -15px, rgba(0,0,0,0.1) 0 0 15px;
      }
      .wrapper {
        padding: 0;
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
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
      }
      li > .active {
        color: var(--black);
        border-bottom-color: var(--gray);
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
      .content {
        border-radius: 5px;
        overflow: auto;
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
