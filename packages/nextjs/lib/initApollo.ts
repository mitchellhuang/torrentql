import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { typeDefs, resolvers } from '../apollo/resolvers';
import { torrentStatus } from '../lib/constants';

let apolloClient = null;

const DEFAULT_DASHBOARD_CACHE = {
  searchFilter: '',
  statusFilter: torrentStatus.ALL,
  trackerFilter: '',
  selectedTorrents: [],
  __typename: 'Dashboard',
};

function create(initialState, { getToken }) {
  const browser = typeof window !== 'undefined';
  const httpLink = new HttpLink({
    uri: browser ? '/graphql' : process.env.API_URI,
    credentials: 'same-origin',
    fetch: !fetch && fetch,
  });
  const cache = new InMemoryCache({
    freezeResults: true,
  }).restore(initialState || {});
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  if (typeof window === 'undefined') {
    let token;
    if (getToken) {
      token = getToken();
    }
    cache.writeData({
      data: {
        isLoggedIn: !!token,
        dashboard: DEFAULT_DASHBOARD_CACHE,
      },
    });
  }
  return new ApolloClient({
    connectToDevTools: browser,
    ssrMode: !browser,
    link: authLink.concat(httpLink),
    cache,
    assumeImmutableResults: true,
    typeDefs,
    resolvers,
  });
}

export default function initApollo(initialState, options) {
  if (typeof window === 'undefined') {
    return create(initialState, options);
  }
  if (!apolloClient) {
    apolloClient = create(initialState, options);
    apolloClient.onResetStore(() => {
      return apolloClient.cache.writeData({
        data: {
          isLoggedIn: false,
          dashboard: DEFAULT_DASHBOARD_CACHE,
        },
      });
    });
  }
  return apolloClient;
}
