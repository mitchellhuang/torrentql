import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`;

export const GET_DASHBOARD_QUERY = gql`
  {
    getDashboard @client {
      searchFilter
      statusFilter
      trackerFilter
      selectedTorrents
    }
  }
`;

export const ME_QUERY = gql`
  {
    me {
      id
      email
      balance
      apiKeys {
        id
        name
        key
        createdAt
      }
      bitcoinTransactions {
        id
        status
        amount
        amountSatoshi
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_TORRENT_QUERY = gql`
  query GetTorrent($id: String!) {
    getTorrent(id: $id) {
      id
      hash
      name
      state
      progress
      ratio
      totalSize
      uploadSpeed
      downloadSpeed
      eta
      numPeers
      numSeeds
      totalPeers
      totalSeeds
      totalWanted
      totalUploaded
      totalDownloaded
      tracker
      trackerHost
      trackerStatus
      files
      selectedFile @client
      server {
        id
        region
      }
    }
  }
`;

export const GET_TORRENTS_QUERY = gql`
  query GetTorrents {
    getTorrents {
      id
      hash
      name
      state
      progress
      ratio
      totalSize
      uploadSpeed
      downloadSpeed
      eta
      numPeers
      numSeeds
      totalPeers
      totalSeeds
      totalWanted
      totalUploaded
      totalDownloaded
      tracker
      trackerHost
      trackerStatus
      files
      selectedFile @client
      server {
        id
        region
      }
    }
  }
`;
