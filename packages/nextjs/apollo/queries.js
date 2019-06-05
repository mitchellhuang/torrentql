import gql from 'graphql-tag';

export const ME_QUERY = gql`
  {
    me {
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
