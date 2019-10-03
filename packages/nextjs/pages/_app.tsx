import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';

import 'normalize.css';
import 'bootstrap-spacing-utils';
import 'react-vis/dist/style.css';

class MyApp extends App<{apolloClient}> {
  static displayName = 'TorrentQL';

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
