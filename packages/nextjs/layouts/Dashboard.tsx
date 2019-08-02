import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Global from './Global';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import { WithRouterProps } from 'next/dist/client/with-router';

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
        padding-top: 0;
        padding-bottom: 0;
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
        padding: 12px 0;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
      }
      li:not(:last-child) {
        margin-right: 15px;
      }
      li > .active {
        color: var(--black);
        border-bottom-color: var(--gray);
      }
    `}</style>
  </div>
);

interface IDashboard extends React.HTMLProps<HTMLDivElement> {
  title: string;
  noPad?: boolean;
  noFooter?: boolean;
}

const Dashboard : React.FunctionComponent<IDashboard & WithRouterProps> = ({
  children,
  router,
  title,
  noPad,
  ...props
}) => (
  <Global backgroundColor="var(--dashboardBg)" {...props}>
    <Head title={title} />
    <NavBar />
    <div className="tabs">
      <Tabs router={router} />
    </div>
    <div className="confine-scope">
      <div className="wrapper">
        <div className="main">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .main {
        display: flex;
        flex-direction: column;
      }
      ${noPad && `
        .confine-scope .wrapper {
          padding: 0;
        }
      `}
      .content {
        overflow: auto;
      }
    `}</style>
  </Global>
);

export default withRouter(Dashboard);
