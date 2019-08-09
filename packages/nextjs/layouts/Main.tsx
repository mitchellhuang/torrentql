import React from 'react';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from '../components/Head';

interface IMain {
  children: React.ReactNode;
  title?: string;
  noFooter?: boolean;
}

const items = [
  { name: 'Pricing', url: '/pricing' },
  { name: 'Features', url: '/features' },
  { name: 'API', url: '/api' },
  { name: 'Log in →', url: '/login' },
];

const Main: React.FunctionComponent<IMain> = ({
  children,
  title,
  noFooter,
}) => (
  <Global>
    <Head title={title} />
    <div className="main">
      <NavBar items={items} />
      <div className="content">
        {children}
      </div>
      {!noFooter ? <Footer /> : null}
    </div>
  </Global>
);

export default Main;
