const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
    email: String
    torrents: [Torrent]
    token: String
  }
  type Torrent {
    id: String
    status: String
    data: TorrentData
    user: User
    server: Server
  }
  type TorrentData {
    id: String
    name: String
    progress: Float
    ratio: Float
    uploadSpeed: String
    downloadSpeed: String
    eta: String
    connectedPeers: String
    totalPeers: String
    totalSeeds: String
    totalSelected: String
    totalSize: String
    totalUploaded: String
    totalDownloaded: String
  }
  type Server {
    id: String
    host: String
    port: String
    region: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): User
    createUser(email: String!, password: String!): User
    deleteUser: Boolean
    addTorrent(data: String!): Torrent
  }
`;

module.exports = typeDefs;
