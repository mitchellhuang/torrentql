import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { typeDefs, resolvers } from '../resolvers';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  const httpLink = new HttpLink({
    uri: process.browser ? '/graphql' : process.env.API_URI,
    credentials: 'same-origin',
  });
  const token = getToken();
  const authLink = setContext((_, { headers }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : '',
        },
      };
    }
    return { headers };
  });
  const cache = new InMemoryCache().restore(initialState || {});
  cache.writeData({ data: { isLoggedIn: !!token } });
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
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
