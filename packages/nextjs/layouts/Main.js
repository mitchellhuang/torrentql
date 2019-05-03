import React from 'react';
import Head from 'next/head';
import Global from './Global';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Main = ({
  title,
  children,
}) => (
  <Global>
    <Head>
      <meta charSet="UTF-8" />
      <title>{title ? `${title} - TorrentQL` : 'TorrentQL'}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="outer">
      <NavBar />
      <div className="inner">
        {children}
      </div>
      <Footer />
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
