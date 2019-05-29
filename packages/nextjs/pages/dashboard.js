import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Main from '../layouts/Main';
import Button from '../components/Button';
import useModal from '../lib/useModal';
import AddTorrentModal from '../components/modals/AddTorrentModal';

const ME_QUERY = gql`
  {
    me {
      id
      email
      torrents {
        id
        hash
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
      <ToolBar />
      <Torrents />
    </div>
  </Main>
);

const ToolBar = () => {
  const { active, toggle } = useModal();
  return (
    <div className="mb-3">
      <Button onClick={toggle}>Add torrent</Button>
      <AddTorrentModal
        active={active}
        toggle={toggle}
      />
    </div>
  );
};

const Torrents = () => {
  const { loading, data, error } = useQuery(ME_QUERY);
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <div>
      {JSON.stringify(error)}
      {JSON.stringify(data)}
    </div>
  );
};

export default Dashboard;
