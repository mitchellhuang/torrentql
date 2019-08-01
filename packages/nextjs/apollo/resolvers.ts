import gql from 'graphql-tag';
import { GET_TORRENT_QUERY, GET_DASHBOARD_QUERY } from './queries';

export const typeDefs = gql`
    extend type Torrent {
      selectedFile: String
    }
    type Dashboard {
      searchFilter: String
      statusFilter: String
      selectedTorrents: [String]
    }
    extend type Query {
      getDashboard: Dashboard!
    }
    extend type Mutation {
      updateSelectedFile(id: String!, filePath: String!): Torrent
      updateSearchFilter(searchFilter: String!): Dashboard
      updateStatusFilter(statusFilter: String!): Dashboard
      updateSelectedTorrents(selectedTorrents: [String]!): Dashboard
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
    updateSearchFilter: (_, { searchFilter }, { cache }) => {
      const { getDashboard } = cache.readQuery({ query: GET_DASHBOARD_QUERY });
      getDashboard.searchFilter = searchFilter;
      return cache.writeQuery({
        query: GET_DASHBOARD_QUERY,
        data: { getDashboard },
      });
    },
    updateStatusFilter: (_, { statusFilter }, { cache }) => {
      const { getDashboard } = cache.readQuery({ query: GET_DASHBOARD_QUERY });
      getDashboard.statusFilter = statusFilter;
      return cache.writeQuery({
        query: GET_DASHBOARD_QUERY,
        data: { getDashboard },
      });
    },
    updateSelectedTorrents: (_, { selectedTorrents }, { cache }) => {
      const { getDashboard } = cache.readQuery({ query: GET_DASHBOARD_QUERY });
      getDashboard.selectedTorrents = selectedTorrents;
      return cache.writeQuery({
        query: GET_DASHBOARD_QUERY,
        data: { getDashboard },
      });
    },
  },
};
