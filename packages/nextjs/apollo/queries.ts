import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`;

export const DASHBOARD_QUERY = gql`
  query dashboard {
    dashboard @client {
      searchFilter
      statusFilter
      trackerFilter
      selectedTorrents
    }
  }
`;

export const BILLING_USAGE_QUERY = gql`
  query billingUsage {
    billingUsage
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      balance
      status
      createdAt
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

const FILES_FRAGMENT = gql`
  fragment FileFields on File {
    name
    type
    progress
    url
  }
  fragment Files on File {
    ...FileFields
    children {
      ...FileFields
      children {
        ...FileFields
        children {
          ...FileFields
          children {
            ...FileFields
            children {
              ...FileFields
              children {
                ...FileFields
                children {
                  ...FileFields
                  children {
                    ...FileFields
                    children {
                      ...FileFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_TORRENT_QUERY = gql`
  query getTorrent($id: String!) {
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
      files {
        ...Files
      }
      selectedFile @client
      server {
        id
        region
      }
    }
  }
  ${FILES_FRAGMENT}
`;

export const GET_TORRENTS_QUERY = gql`
  query getTorrents {
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
      files {
        ...Files
      }
      selectedFile @client
      server {
        id
        region
      }
    }
  }
  ${FILES_FRAGMENT}
`;
