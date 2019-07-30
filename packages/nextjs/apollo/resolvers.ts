import gql from 'graphql-tag';
import { GET_TORRENT_QUERY, GET_DASHBOARD_QUERY } from './queries';

export const typeDefs = gql`
  extend type Torrent {
    selectedFile: String
  }
  type Dashboard {
    filter: String
  }
  extend type Query {
    getDashboard: Dashboard!
  }
  extend type Mutation {
    updateSelectedFile(id: String!, filePath: String!): Torrent
    updateFilter(filter: String!): Dashboard
  }
`;

export const resolvers = {
  Torrent: {
    selectedFile: (torrent, _, { cache }) => {
      try {
        const { getTorrent: { selectedFile } } = cache.readQuery({
          query: GET_TORRENT_QUERY,
          variables: { id: torrent.id },
        });
        return selectedFile;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    updateSelectedFile: (_, { id, filePath }, { cache }) => {
      const { getTorrent } = cache.readQuery({ query: GET_TORRENT_QUERY, variables: { id } });
      getTorrent.selectedFile = filePath;
      cache.writeQuery({
        query: GET_TORRENT_QUERY,
        data : { getTorrent },
        variables: { id },
      });
      return getTorrent;
    },
    updateFilter: (_, { filter }, { cache }) => {
      const { getDashboard } = cache.readQuery({ query: GET_DASHBOARD_QUERY });
      getDashboard.filter = filter;
      return cache.writeQuery({
        query: GET_DASHBOARD_QUERY,
        data: { getDashboard },
      });
    },
  },
};
