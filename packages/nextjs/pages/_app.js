import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import initApollo from '../lib/initApollo';

const apolloClient = initApollo();

class TorrentQL extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default TorrentQL;
