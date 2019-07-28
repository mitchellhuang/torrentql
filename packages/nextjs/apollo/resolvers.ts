import gql from 'graphql-tag';
import {GET_TORRENT_QUERY, ME_QUERY} from './queries';

export const typeDefs = gql`
  extend type Torrent {
    selectedFile: String
  }
  extend type User {
      filter: String
  }
  extend type Mutation {
    updateSelectedFile(id: String!, filePath: String!): Torrent
  }
  extend type Mutation {
    updateSearchQuery(searchQuery: String!): User
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
  User: {
    filter: (_, _, { cache }) => {
      try {
        const { me: { filter } } = cache.readQuery({
          query: ME_QUERY,
        });
        console.log('filter', filter);
        return filter;
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
    updateSearchQuery: (_, { searchQuery }, { cache }) => {
      console.log("UPDATING SEARCH QUERY");
      const { me } = cache.readQuery({ query: ME_QUERY });
      console.log('me', me);
      me.filter = searchQuery;
      cache.writeQuery({
        query: GET_TORRENT_QUERY,
        data : { me },
      });
      return me;
    },
  },
};
