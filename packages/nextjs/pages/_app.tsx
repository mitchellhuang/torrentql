import App, { Container } from 'next/app';
import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo-hooks';
import withApollo from '../lib/withApollo';

import 'normalize.css';
import 'bootstrap-spacing-utils';

class TorrentQL extends App<{ apolloClient: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} apolloClient={apolloClient} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(TorrentQL);
