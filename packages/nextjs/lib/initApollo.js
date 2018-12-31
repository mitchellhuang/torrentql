import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const inMemoryCache = new InMemoryCache().restore(initialState || {});
  const httpLink = new HttpLink({
    uri: process.browser ? '/graphql' : process.env.API_URI,
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: true,
    link: httpLink,
    cache: inMemoryCache,
  });
}

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
