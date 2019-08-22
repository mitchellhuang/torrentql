import gql from 'graphql-tag';
import { GET_TORRENT_QUERY, DASHBOARD_QUERY } from './queries';

export const typeDefs = gql`
    extend type Torrent {
      selectedFile: String
    }
    type Dashboard {
      searchFilter: String
      statusFilter: String
      trackerFilter: String
      selectedTorrents: [String]
    }
    extend type Query {
      dashboard: Dashboard!
    }
    extend type Mutation {
      updateSelectedFile(id: String!, filePath: String!): Torrent
      updateSearchFilter(searchFilter: String!): Dashboard
      updateStatusFilter(statusFilter: String!): Dashboard
      updateTrackerFilter(trackerFilter: String!): Dashboard
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
      cache.writeQuery({
        query: GET_TORRENT_QUERY,
        data : { getTorrent: { ...getTorrent, selectedFile: filePath } },
        variables: { id },
      });
      return getTorrent;
    },
    updateSearchFilter: (_, { searchFilter }, { cache }) => {
      const { dashboard } = cache.readQuery({ query: DASHBOARD_QUERY });
      cache.writeQuery({
        query: DASHBOARD_QUERY,
        data: { dashboard: { ...dashboard, searchFilter } },
      });
      return dashboard;
    },
    updateStatusFilter: (_, { statusFilter }, { cache }) => {
      const { dashboard } = cache.readQuery({ query: DASHBOARD_QUERY });
      cache.writeQuery({
        query: DASHBOARD_QUERY,
        data: { dashboard: { ...dashboard, statusFilter } },
      });
      return dashboard;
    },
    updateTrackerFilter: (_, { trackerFilter }, { cache }) => {
      const { dashboard } = cache.readQuery({ query: DASHBOARD_QUERY });
      cache.writeQuery({
        query: DASHBOARD_QUERY,
        data: { dashboard: { ...dashboard, trackerFilter } },
      });
      return dashboard;
    },
    updateSelectedTorrents: (_, { selectedTorrents }, { cache }) => {
      const { dashboard } = cache.readQuery({ query: DASHBOARD_QUERY });
      cache.writeQuery({
        query: DASHBOARD_QUERY,
        data: { dashboard: { ...dashboard, selectedTorrents } },
      });
      return dashboard;
    },
  },
};
