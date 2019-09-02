import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import Layout from '../layouts/Account';
import withAuth from '../lib/withAuth';
import { ME_QUERY } from '../apollo/queries';
import Card from '../components/Card';
import UpdateEmailForm from '../forms/UpdateEmailForm';
import UpdatePasswordForm from '../forms/UpdatePasswordForm';
import { LoadingState } from '../components/State';
import colors from '../lib/colors';

const StatusColor = {
  enabled: colors.green,
  disabled: colors.error,
  banned: colors.error,
};

const Status = ({
  status,
}) => (
  <span>
    {status}
    <style jsx>{`
      span {
        text-transform: capitalize;
        color: white;
        padding: 4px 5px;
        border-radius: 5px;
        background-color: ${StatusColor[status]};
      }
    `}</style>
  </span>
);

const Account = () => {
  const { loading, data } = useQuery(ME_QUERY);
  const me = data && data.me;
  if (loading) {
    return (
      <Layout title="Account">
        <Card title="Account">
          <LoadingState />
        </Card>
      </Layout>
    );
  }
  return (
    <Layout title="Account">
      <Card title="Account" className="mb-3">
        <p className="mb-1">Status: <Status status={me.status} /></p>
        <p>Created on: {moment(me.createdAt).format('LL')}</p>
      </Card>
      <Card title="Email" className="mb-3">
        <UpdateEmailForm />
      </Card>
      <Card title="Password">
        <UpdatePasswordForm />
      </Card>
    </Layout>
  );
};

export default withAuth(Account);
