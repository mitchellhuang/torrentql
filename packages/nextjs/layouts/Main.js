import React from 'react';
import Head from 'next/head';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import favicon16 from '../static/favicon-16x16.png';
import favicon32 from '../static/favicon-32x32.png';

const Main = ({
  title,
  children,
  noFooter,
}) => (
  <Global>
    <Head>
      <meta charSet="UTF-8" />
      <title>{title ? `${title} - TorrentQL` : 'TorrentQL'}</title>
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="outer">
      <NavBar />
      <div className="inner">
        {children}
      </div>
      {!noFooter ? <Footer /> : null}
    </div>
    <div id="modal-root" />
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
