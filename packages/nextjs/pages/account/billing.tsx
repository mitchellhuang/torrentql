import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { ME_QUERY } from '../../apollo/queries';
import { LoadingState, EmptyState } from '../../components/State';

const Balance = ({
  balance,
  ...props
}) => (
  <Card title="Billing" {...props}>
    <h2 className="mb-2">${balance.toFixed(2)}</h2>
    <p>Your current account balance.</p>
  </Card>
);

const Recharge = props => (
  <Card title="Recharge Account" {...props}>
    <div>
      <Button className="mr-2" outline>$20</Button>
      <Button className="mr-2" outline>$40</Button>
      <Button className="mr-2" outline>$60</Button>
      <Button className="mr-2" outline>$80</Button>
      <Button outline>$100</Button>
    </div>
    <p className="mt-2">Recharge your account balance with Bitcoin.</p>
  </Card>
);

const Automatic = props => (
  <Card title="Automatic Recharge (coming soon)" {...props}>
    <p>
      Automatically recharge your account balance when it falls below a certain amount.
    </p>
  </Card>
);

const History = props => (
  <Card title="Transaction History" {...props}>
    <p>
      Your transaction history for the last 30 days.
    </p>
  </Card>
);

const Billing = () => {
  const { loading, data } = useQuery(ME_QUERY, { ssr: false });
  const me = data && data.me;
  if (loading) {
    return (
      <Account title="Billing">
        <Card title="Billing">
          <LoadingState />
        </Card>
      </Account>
    );
  }
  return (
    <Account title="Billing">
      <div>
        <Balance balance={me.balance} className="mb-3" />
        <Recharge className="mb-3" />
        <Automatic className="mb-3" />
        <History />
      </div>
      <style jsx>{`
        div :global(p) {
          color: var(--dark-gray);
        }
      `}</style>
    </Account>
  );
};

export default withAuth(Billing);
