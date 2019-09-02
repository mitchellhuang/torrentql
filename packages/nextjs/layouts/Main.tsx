import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Color from 'color';
import { IS_LOGGED_IN_QUERY } from '../apollo/queries';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from '../components/Head';

interface IMain {
  children: React.ReactNode;
  title?: string;
  noFooter?: boolean;
  backgroundColor?: Color;
}

const Main: React.FunctionComponent<IMain> = ({
  children,
  title,
  noFooter,
  backgroundColor,
}) => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const items = [
    { name: 'Pricing', url: '/pricing' },
    { name: 'Features', url: '/features' },
    { name: 'API', url: '/api' },
  ];
  const finalItem = (data && data.isLoggedIn)
    ? { name: 'Dashboard', url: '/dashboard' }
    : { name: 'Log in', url: '/login' };
  items.push(finalItem);
  return (
    <Global backgroundColor={backgroundColor}>
      <Head title={title} />
      <div className="main">
        <NavBar items={items} />
        <div className="content">
          {children}
        </div>
        {!noFooter && <Footer />}
      </div>
    </Global>
  );
};

export default Main;
