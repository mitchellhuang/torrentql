import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Main from '../layouts/Main';

const GET_USER = gql`
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
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return `Error: ${error.message}`;
          }
          return JSON.stringify(data.me);
        }}
      </Query>
    </div>
  </Main>
);

export default Dashboard;
