import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Main from '../layouts/Main';
import Button from '../components/Button';
import Torrent from '../components/Torrent';
import useModal from '../lib/useModal';
import AddTorrentModal from '../components/modals/AddTorrentModal';
import ProgressBar from '../components/ProgressBar'
const ME_QUERY = gql`
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

const Dashboard = () => (
  <Main title="Dashboard">
    <div className="wrapper">
      <ProgressBar className="progress-bar" progress="20" color="var(--primary)"/>
      <ToolBar />
      <Torrents />

    </div>
  </Main>
);

const ToolBar = () => {
  const { active, toggle } = useModal();
  return (
    <div className="toolbar">
      <h3>DASHBOARD</h3>
      <Button onClick={toggle}>Add torrent</Button>
      <AddTorrentModal
        active={active}
        toggle={toggle}
        refetchQueries={[{ query: ME_QUERY }]}
      />
      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

const Torrents = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div>
        {JSON.stringify(error)}
      </div>
    );
  }
  if (!data) {
    return null;
  }
  const { torrents } = data.me;
  if (!torrents.length) {
    return (
      <div>
        No torrents.
      </div>
    );
  }
  return (
    <div>
      {torrents.map(torrent => <Torrent key={torrent.id} torrent={torrent} />)}
    </div>
  );
};

export default Dashboard;
