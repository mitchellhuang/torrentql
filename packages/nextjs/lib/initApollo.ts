import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { typeDefs, resolvers } from '../apollo/resolvers';
import { torrentStatus } from '../lib/constants';

let apolloClient;

if (!process.browser) {
  (global as any).fetch = fetch;
}

const DEFAULT_DASHBOARD_CACHE = {
  searchFilter: '',
  statusFilter: torrentStatus.ALL,
  selectedTorrents: [],
  __typename: 'Dashboard',
};

function create(initialState, { getToken }) {
  const httpLink = new HttpLink({
    uri: process.browser ? '/graphql' : process.env.API_URI,
    credentials: 'same-origin',
  });
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const token = getToken();
  const cache = new InMemoryCache().restore(initialState || {});
  cache.writeData({
    data: {
      isLoggedIn: !!token,
      getDashboard: DEFAULT_DASHBOARD_CACHE,
    },
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers,
  });
}

export default function initApollo(initialState, options) {
  if (!process.browser) {
    return create(initialState, options);
  }
  if (!apolloClient) {
    apolloClient = create(initialState, options);
    apolloClient.onResetStore(() => {
      return apolloClient.cache.writeData({
        data: {
          isLoggedIn: false,
          getDashboard: DEFAULT_DASHBOARD_CACHE,
        },
      });
    });
  }
  return apolloClient;
}
