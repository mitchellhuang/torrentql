import React from 'react';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import Graph from '../../components/Graph';

const Usage = () => (
  <Account title="Usage">
    <Card title="Usage">
      <Graph />
      Usage information will go here.
    </Card>
  </Account>
);

export default withAuth(Usage);
