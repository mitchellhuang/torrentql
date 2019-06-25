import React from 'react';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from '../components/Head';

const Main = ({
  title,
  children,
  noFooter,
}) => (
  <Global>
    <Head title={title} />
    <div className="main">
      <NavBar />
      <div className="content">
        {children}
      </div>
      {!noFooter ? <Footer /> : null}
    </div>
  </Global>
);

export default Main;