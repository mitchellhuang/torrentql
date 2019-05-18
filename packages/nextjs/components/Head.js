import React from 'react';
import NextHead from 'next/head';

const Head = ({
  title,
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || 'TorrentQL'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </NextHead>
);

export default Head;
