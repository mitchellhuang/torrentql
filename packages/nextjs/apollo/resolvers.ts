import gql from 'graphql-tag';
import {GET_TORRENT_QUERY, GET_DASHBOARD_QUERY, ME_QUERY} from './queries';

export const typeDefs = gql`
    extend type Torrent {
      selectedFile: String
      downloadSpeeds: [Int]
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
      updateDownloadSpeeds(id: String!, downloadSpeeds: [Int]!): Torrent
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
    downloadSpeeds: (torrent, _, { cache }) => {
      try {
        const { getTorrent: { downloadSpeeds } } = cache.readQuery({
          query: ME_QUERY,
          variables: { id: torrent.id },
        });
        return downloadSpeeds;
      } catch (error) {
        return Array(30).fill(0);
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
    updateDownloadSpeeds: (_, { id, downloadSpeeds }, { cache }) => {
      const data = cache.readQuery({ query: ME_QUERY });
      console.log(data);
      console.log(downloadSpeeds);
      cache.writeQuery({
        query: ME_QUERY,
        data : { data },
        variables: { id },
      });
      return data;
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
