import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const baseUrl = !process.browser ? process.env.API_URI : '';
  const inMemoryCache = new InMemoryCache().restore(initialState || {});
  const stateLink = withClientState({
    cache: inMemoryCache,
    defaults: {
      files: [],
    },
    resolvers: {
      Mutation: {
        addFile: (_, { file }, { cache }) => {
          const GET_FILES = gql`
            query files {
              files @client {
                id
                name
                type
                size
                source
                status
                progress
                updatedAt
                createdAt
                client
              }
            }
          `;
          const { files } = cache.readQuery({ query: GET_FILES });
          cache.writeData({ data: { files: [...files, file] } });
          return null;
        },
        updateFile: (_, { id, ...data }, { cache, getCacheKey }) => {
          const cacheId = getCacheKey({ __typename: 'File', id });
          cache.writeData({ id: cacheId, data });
          return null;
        },
      },
    },
  });
  const httpLink = new HttpLink({
    uri: `${baseUrl}/graphql`,
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: false,
    link: ApolloLink.from([stateLink, httpLink]),
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
