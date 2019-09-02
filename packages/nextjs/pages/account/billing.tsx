import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { TRow, TCell } from '../../components/Table';
import { ME_QUERY } from '../../apollo/queries';
import { CREATE_BITCOIN_TRANSACTION_MUTATION } from '../../apollo/mutations';
import { LoadingState } from '../../components/State';
import colors from '../../lib/colors';

const Balance = ({
  balance,
  ...props
}) => (
  <Card title="Billing" {...props}>
    <h2 className="mb-2">${balance.toFixed(2)}</h2>
    <p className="footnote">Your current account balance.</p>
  </Card>
);

const PayWithBitcoinButton = ({
  href,
  ...props
}) => (
  <a
    href={href}
    target="_blank"
    {...props}>
    <img
      src="/static/payment-button.svg" />
    <style jsx>{`
      a {
        display: inline-block;
        height: 46.34px;
        width: 165px;
      }
      a img {
        width: 100%;
        border-radius: 5px;
      }
    `}</style>
  </a>
);

const Recharge = (props) => {
  const [createBitcoinTransaction, { loading, data }] = useMutation(CREATE_BITCOIN_TRANSACTION_MUTATION);
  const bitcoinTransaction = data && data.createBitcoinTransaction;
  const handleClick = amount => createBitcoinTransaction({ variables: { amount } });
  return (
    <Card title="Recharge" {...props}>
      <div>
        <Button className="mr-2" onClick={() => handleClick(20)} outline>$20</Button>
        <Button className="mr-2" onClick={() => handleClick(40)} outline>$40</Button>
        <Button className="mr-2" onClick={() => handleClick(60)} outline>$60</Button>
        <Button className="mr-2" onClick={() => handleClick(80)} outline>$80</Button>
        <Button onClick={() => handleClick(100)} outline>$100</Button>
      </div>
      {loading ?
          <p className="mt-2">Generating invoice...</p> :
          bitcoinTransaction && <PayWithBitcoinButton className="mt-2" href={bitcoinTransaction.invoiceUrl} />}
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
    <Card title="Recharge History" {...props}>
      {children}
      <p className="footnote mt-2">
        Your recharge history since the beginning of time.
      </p>
    </Card>
  );
  if (!bitcoinTransactions.length) {
    return (
      <Layout {...props}>
      </Layout>
    );
  }
  return (
    <Layout {...props}>
      <div className="table">
        <TRow header bold noPad>
          <TCell flex={4}>ID</TCell>
          <TCell flex={1}>Status</TCell>
          <TCell flex={1}>Amount</TCell>
          <TCell flex={2}>Created at</TCell>
          <TCell flex={2}>Updated at</TCell>
        </TRow>
        {bitcoinTransactions.map(bitcoinTransaction => (
          <TRow key={bitcoinTransaction.id} noPad>
            <TCell flex={4}>{bitcoinTransaction.id}</TCell>
            <TCell flex={1}>{bitcoinTransaction.status.toUpperCase()}</TCell>
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
  const { loading, data } = useQuery(ME_QUERY);
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
      <Balance balance={me.balance} className="mb-3" />
      <Recharge className="mb-3" />
      <Automatic className="mb-3" />
      <History bitcoinTransactions={me.bitcoinTransactions} />
      <style jsx>{`
        :global(.footnote) {
          color: ${colors.darkGray};
        }
      `}</style>
    </Account>
  );
};

export default withAuth(Billing);
