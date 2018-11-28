import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import Head from '../components/Head';
import Footer from '../components/Footer';

const Main = ({
  title,
  children,
}) => (
  <Fragment>
    <Head title={title} />
    <div className="site">
      <NavBar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
    <style jsx>{`
      .site {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
           Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
           'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      .content {
        flex: 1;
      }
    `}</style>
  </Fragment>
);

export default Main;
