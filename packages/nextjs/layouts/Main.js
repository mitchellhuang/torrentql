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
      <div className="content">
        <h1 className="title">TorrentQL</h1>
        <p className="subtitle">Download and seed torrents on a 1 Gb/s OVH network.</p>
        <p className="subtitle">Beta launching in summer of 2019.</p>
      </div>
    </div>
    <style jsx>{`
      .wrapper {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
        align-items: center;
        justify-content: center;
      }
      .content {
        padding: 50px 10px;
        padding-bottom: 25vh;
      }
      .title {
        margin-bottom: 10px;
      }
      .subtitle {
        margin: 0;
        margin-bottom: 10px;
      }
    `}</style>
    <style jsx global>{`
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
