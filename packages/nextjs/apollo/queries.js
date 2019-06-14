import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`;

export const ME_QUERY = gql`
  {
    me {
      id
      torrents {
        id
        hash
        status {
          name
          state
          progress
          ratio
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
        }
        server {
          id
          region
        }
      }
    }
  }
`;
