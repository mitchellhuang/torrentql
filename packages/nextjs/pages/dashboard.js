import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Main from '../layouts/Main';

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
      <Torrents />
    </div>
  </Main>
);

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
