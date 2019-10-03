import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import BillingUsageGraph from '../../components/BillingUsageGraph';
import { GET_BILLING_USAGE_QUERY } from '../../apollo/queries';

const Tabs = ({
  type,
  setType,
}) => {
  const tabs = {
    dataTransferIn: 'Data transfer in',
    dataTransferOut: 'Data transfer out',
    diskUsage: 'Disk usage',
  };
  return (
    <div className="tabs">
      {Object.keys(tabs).map(key => (
        <div className={classNames('tab', { active: type === key })} onClick={() => setType(key)}>
          <div>{tabs[key]}</div>
        </div>
      ))}
      <style jsx>{`
        .tabs {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        .tab {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F7F8FA;
          padding: 10px;
          color: rgb(32, 126, 206);
          cursor: pointer;
        }
        @media(min-width: 767px) {
          .tabs {
            flex-direction: row;
          }
          .tab {
            flex: 1;
          }
          .tab:hover {
            background-color: lightblue;
          }
          .active {
            color: rgb(32, 126, 206);
          }
        }
      `}
      </style>
    </div>
  );
};

const Usage = () => {
  const [type, setType] = useState('dataTransferIn');
  const { data: { getBillingUsage } } = useQuery(GET_BILLING_USAGE_QUERY);
  let content;
  if (getBillingUsage) {
    const keys = [type];
    content = keys.map(key => <BillingUsageGraph billingUsages={getBillingUsage} graphType={key} key={key} />);
  }
  return (
    <Account title="Usage">
      <Card title="Usage">
      <Tabs type={type} setType={setType} />
      {content}
      </Card>
    </Account>
  );
};

export default withAuth(Usage);
