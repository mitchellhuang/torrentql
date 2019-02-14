import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Main from '../layouts/Main';

const Dashboard = () => (
  <Main title="Dashboard - TorrentQL">
    <DisplayQuery />
  </Main>
);

const GET_USER = gql`
  {
    User {
      id
      email
      token
      torrents
    }
  }
`;

const DisplayQuery = () => (
  <div className="dashboard">
    <Query query={GET_USER}>
      {({ loading, error, data }) => (
        loading ? <p>Loading...</p> :
        error ? <p>Error: {error.message}</p> : (
          <div>
          {data.User.id}
          </div>
        )
      )}
    </Query>
  </div>
);

export default Dashboard;
