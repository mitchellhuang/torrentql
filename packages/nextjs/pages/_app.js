import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import withApollo from '../lib/withApollo';

import 'normalize.css';
import 'bootstrap-spacing-utils';

class TorrentQL extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} client={apolloClient} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(TorrentQL);
