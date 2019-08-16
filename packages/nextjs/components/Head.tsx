import React from 'react';
import Head from 'next/head';
import favicon16 from '../static/favicon-16x16.png';
import favicon32 from '../static/favicon-32x32.png';

const CustomHead = ({
  title,
}) => (
  <Head>
    <meta charSet="UTF-8" />
    <title>{title ? `${title} - TorrentQL` : 'TorrentQL'}</title>
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
);

export default CustomHead;
