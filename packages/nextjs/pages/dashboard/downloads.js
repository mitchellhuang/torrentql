import React from 'react';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';

const Downloads = () => (
  <Dashboard title="Downloads" noFooter>
    <div>
      Downloads.
    </div>
  </Dashboard>
);

export default withAuth(Downloads);
