import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Account from '../../../layouts/Account';
import withAuth from '../../../lib/withAuth';
import Card from '../../../components/Card';
// import Link from 'next/link';
import GraphTabs from '../../../components/GraphTabs';
import BillingUsageGraph from '../../../components/BillingUsageGraph';
import { GET_BILLING_USAGE_QUERY } from '../../../apollo/queries';

const Usage = () => {
  const { data: { getBillingUsage } } = useQuery(GET_BILLING_USAGE_QUERY);
  let content;
  if (getBillingUsage) {
    const keys = ['diskUsage'];
    content = keys.map(key => <BillingUsageGraph billingUsages={getBillingUsage} graphType={key} key={key} />);
  }
  return (
    <Account title="Usage">
    <GraphTabs />
      <Card title="Usage">
        {content}
      </Card>
    </Account>
  );
};

export default withAuth(Usage);
