import React from 'react';
import classNames from 'classnames';
import Global from './Global';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import colors from '../lib/colors';

const items = [
  { name: 'Files', url: '/files' },
  { name: 'Account', url: '/account' },
];

interface IDashboard extends React.HTMLProps<HTMLDivElement> {
  title: string;
  noMaxWidth?: boolean;
  noPad?: boolean;
  noFooter?: boolean;
}

const Dashboard : React.FunctionComponent<IDashboard> = ({
  children,
  title,
  noMaxWidth,
  noPad,
  ...props
}) => (
  <Global backgroundColor={colors.dashboardBg} {...props}>
    <Head title={title} />
    <NavBar logoLink="/dashboard" items={items} noMaxWidth={noMaxWidth} />
    <div className={classNames('wrapper', { 'wrapper-no-max-width': noMaxWidth, 'no-pad': noPad })}>
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
