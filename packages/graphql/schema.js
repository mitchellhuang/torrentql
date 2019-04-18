const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
    email: String
    token: String
    torrents: [Torrent]
  }
  type Torrent {
    id: String
    magnet: String
    file: String
    user: User
    server: Server
  }
  type Server {
    id: String
    hostname: String
    region: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String): User
    createUser(email: String!, password: String!): User
    deleteUser: Boolean
    addTorrent(magnet: String, file: String): Torrent
  }
`;

module.exports = typeDefs;
