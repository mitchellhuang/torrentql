import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import BillingUsageGraph from '../../components/BillingUsageGraph';
import { GET_BILLING_USAGE_QUERY } from '../../apollo/queries';

const Usage = () => {
  const { data: { getBillingUsage } } = useQuery(GET_BILLING_USAGE_QUERY);
  let content;
  if (getBillingUsage) {
    const keys = ['dataTransferOut', 'dataTransferIn', 'diskUsage'];
    content = keys.map(key => <BillingUsageGraph billingUsages={getBillingUsage} graphType={key} key={key} />);
  }
  return (
    <Account title="Usage">
      <Card title="Usage">
        {content}
      </Card>
    </Account>
  );
};

export default withAuth(Usage);
