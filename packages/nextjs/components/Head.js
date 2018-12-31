import React from 'react';
import NextHead from 'next/head';

const Head = ({
  title,
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || 'TorrentQL'}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </NextHead>
);

export default Head;
