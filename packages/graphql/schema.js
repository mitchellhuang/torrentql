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
    hash: String
    status: TorrentStatus
    user: User
    server: Server
  }
  type TorrentStatus {
    name: String
    state: String
    progress: Float
    ratio: Float
    uploadSpeed: Int
    downloadSpeed: Int
    eta: Int
    numPeers: Int
    numSeeds: Int
    totalPeers: Int
    totalSeeds: Int
    totalWanted: BigInt
    totalUploaded: BigInt
    totalDownloaded: BigInt
    tracker: String
    trackerHost: String
    trackerStatus: String
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
