import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  const inMemoryCache = new InMemoryCache().restore(initialState || {});
  const httpLink = new HttpLink({
    uri: process.browser ? '/graphql' : process.env.API_URI,
  });
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : null,
        },
      };
    }
    return { headers };
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: inMemoryCache,
  });
}

export default function initApollo(initialState, options) {
  if (!process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
