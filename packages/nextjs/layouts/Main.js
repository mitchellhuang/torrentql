import React from 'react';
import Head from 'next/head';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Main = ({
  title,
  children,
  noFooter,
}) => (
  <Global>
    <Head>
      <meta charSet="UTF-8" />
      <title>{title ? `${title} - TorrentQL` : 'TorrentQL'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="outer">
      <NavBar />
      <div className="inner">
        {children}
      </div>
      {!noFooter ? <Footer /> : null}
    </div>
    <style jsx>{`
      .outer {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
      .inner {
        display: flex;
        flex: 1;
      }
    `}</style>
  </Global>
);

export default Main;
