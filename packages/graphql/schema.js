const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar BigInt
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
    uploadSpeed: BigInt
    downloadSpeed: BigInt
    eta: Int
    connectedPeers: Int
    totalPeers: Int
    totalSeeds: Int
    totalSelected: BigInt
    totalSize: BigInt
    totalUploaded: BigInt
    totalDownloaded: BigInt
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
