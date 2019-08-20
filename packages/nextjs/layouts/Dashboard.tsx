import React from 'react';
import classNames from 'classnames';
import Global from './Global';
import Head from '../components/Head';
import NavBar from '../components/NavBar';

const items = [
  { name: 'Files', url: '/files' },
  { name: 'Account', url: '/account' },
];

interface IDashboard extends React.HTMLProps<HTMLDivElement> {
  title: string;
  noWrap?: boolean;
  noPad?: boolean;
  noFooter?: boolean;
  noNavBarItems?: boolean;
  homeLink?: boolean;
}

const Dashboard : React.FunctionComponent<IDashboard> = ({
  children,
  title,
  noWrap,
  noPad,
  noNavBarItems,
  homeLink,
  ...props
}) => (
  <Global backgroundColor="var(--dashboard-bg)" {...props}>
    <Head title={title} />
    <NavBar logoLink={!homeLink && '/dashboard'} items={noNavBarItems ? [] : items} />
    <div className={classNames({ wrapper: !noWrap, 'no-pad': noPad })}>
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
      .no-pad {
        padding: 0;
      }
      .content {
        flex: 1;
      }
    `}</style>
  </Global>
);

export default Dashboard;
