import React from 'react';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';

const Home = () => (
  <Dashboard title="Dashboard" noFooter>
    <div>
      Home.
    </div>
  </Dashboard>
);

export default withAuth(Home);
