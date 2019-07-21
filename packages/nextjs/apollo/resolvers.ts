import gql from 'graphql-tag';
import { GET_TORRENT_QUERY } from './queries';

export const typeDefs = gql`
    extend type Torrent {
      selectedFile: String
    }
    extend type Mutation {
      updateSelectedFile(id: String!, filePath: String!): Torrent
    }
`;

export const resolvers = {
  Torrent: {
    selectedFile: (torrent, _, { cache }) => {
      try {
        const data = cache.readQuery({ query: GET_TORRENT_QUERY, variables: { id: torrent.id } });
        return data.getTorrent.selectedFile;
      } catch(error) {
        return null;
      }
    },
  },
  Mutation: {
    updateSelectedFile: (_, { id, filePath }, { cache }) => {
      const data = cache.readQuery({ query: GET_TORRENT_QUERY, variables: { id } });
      data.getTorrent.selectedFile = filePath;
      cache.writeQuery({
        query: GET_TORRENT_QUERY,
        data,
        variables: { id },
      });
      return data.getTorrent;
    },
  },
};
