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
    <div className="wrapper">
      <NavBar />
      <div className="container">
        {children}
      </div>
      <Footer />
    </div>
    <style jsx>{`
      .wrapper {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
      .container {
        padding: 15px;
        max-width: 1280px;
        margin: 0 auto;
        flex: 1;
      }
    `}</style>
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      h1, h2, h3, h4, h5 {
        margin-top: 0;
        font-weight: 600;
      }
      a {
        text-decoration: none;
        color: #0076ff;
      }
    `}</style>
  </Fragment>
);

export default Main;
