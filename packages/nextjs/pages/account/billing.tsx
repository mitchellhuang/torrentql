import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import moment from 'moment';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { TRow, TCell } from '../../components/Table';
import { ME_QUERY } from '../../apollo/queries';
import { CREATE_BITCOIN_TRANSACTION_MUTATION } from '../../apollo/mutations';
import { LoadingState, EmptyState } from '../../components/State';

const Balance = ({
  balance,
  ...props
}) => (
  <Card title="Billing" {...props}>
    <h2 className="mb-2">${balance.toFixed(2)}</h2>
    <p className="footnote">Your current account balance.</p>
  </Card>
);

const Recharge = (props) => {
  const [createBitcoinTransaction, { loading, data }] = useMutation(CREATE_BITCOIN_TRANSACTION_MUTATION);
  const bitcoinTransaction = data && data.createBitcoinTransaction;
  const handleClick = amount => createBitcoinTransaction({ variables: { amount } });
  return (
    <Card title="Recharge Account" {...props}>
      <div>
        <Button className="mr-2" onClick={() => handleClick(20)} outline>$20</Button>
        <Button className="mr-2" onClick={() => handleClick(40)} outline>$40</Button>
        <Button className="mr-2" onClick={() => handleClick(60)} outline>$60</Button>
        <Button className="mr-2" onClick={() => handleClick(80)} outline>$80</Button>
        <Button onClick={() => handleClick(100)} outline>$100</Button>
      </div>
      { loading ?
          <p className="mt-2">Generating invoice...</p> :
          bitcoinTransaction &&
            <p className="mt-2">
              <a href={bitcoinTransaction.invoiceUrl} target="_blank">Pay with Bitcoin</a>
            </p> }
      <p className="footnote mt-2">Recharge your account balance with Bitcoin.</p>
    </Card>
  );
};

const Automatic = props => (
  <Card title="Automatic Recharge (coming soon)" {...props}>
    <p className="footnote">
      Automatically recharge your account balance when it falls below a certain amount.
    </p>
  </Card>
);

const History = ({
  bitcoinTransactions,
  ...props
}) => {
  const Layout = ({ children, ...props }) => (
    <Card title="Transaction History" {...props}>
      {children}
      <p className="footnote mt-2">
        Your transaction history since the beginning of time.
      </p>
    </Card>
  );
  const bitcoinTransactionsFiltered = bitcoinTransactions.filter(bt => bt.status !== 'unpaid');
  if (!bitcoinTransactionsFiltered.length) {
    return (
      <Layout {...props}>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="table">
        <TRow header bold noPad>
          <TCell flex={4}>ID</TCell>
          <TCell flex={1}>Status</TCell>
          <TCell flex={1}>Amount</TCell>
          <TCell flex={2}>Created at</TCell>
          <TCell flex={2}>Updated at</TCell>
        </TRow>
        {bitcoinTransactionsFiltered.map(bitcoinTransaction => (
          <TRow noPad>
            <TCell flex={4}>{bitcoinTransaction.id}</TCell>
            <TCell flex={1}>{bitcoinTransaction.status}</TCell>
            <TCell flex={1}>${bitcoinTransaction.amount}</TCell>
            <TCell flex={2}>{moment(bitcoinTransaction.createdAt).format('LLL')}</TCell>
            <TCell flex={2}>{moment(bitcoinTransaction.updatedAt).format('LLL')}</TCell>
          </TRow>
          ))}
      </div>
    </Layout>
  );
};

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
        <History bitcoinTransactions={me.bitcoinTransactions} />
      </div>
      <style jsx>{`
        div :global(.footnote) {
          color: var(--dark-gray);
        }
      `}</style>
    </Account>
  );
};

export default withAuth(Billing);
