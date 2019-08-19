import React from 'react';
import Dashboard from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';

const Files = () => (
  <Dashboard title="Files" noFooter>
    <div>
      Files.
    </div>
  </Dashboard>
);

export default withAuth(Files);
