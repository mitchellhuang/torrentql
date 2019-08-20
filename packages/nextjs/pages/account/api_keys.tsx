import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import moment from 'moment';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';
import Card from '../../components/Card';
import { ME_QUERY } from '../../apollo/queries';
import { DELETE_API_KEY_MUTATION } from '../../apollo/mutations';
import { TRow, TCell } from '../../components/Table';
import Button from '../../components/Button';
import { LoadingState, EmptyState } from '../../components/State';
import useModal from '../../lib/useModal';
import CreateApiKeyModal from '../../modals/CreateApiKeyModal';

const ApiKey = ({
  apiKey: {
    id,
    name,
    createdAt,
  },
}) => {
  const [deleteApiKey] = useMutation(DELETE_API_KEY_MUTATION);
  const handleDeleteApiKey = id => deleteApiKey({
    variables: {
      id,
    },
    update(cache) {
      const { me } = cache.readQuery({ query: ME_QUERY });
      me.apiKeys = me.apiKeys.filter(apiKey => apiKey.id !== id);
      cache.writeQuery({
        query: ME_QUERY,
        data: { me },
      });
    },
  });
  return (
    <TRow>
      <TCell flex={2}>{name}</TCell>
      <TCell flex={2}>{moment(createdAt).format('LLL')}</TCell>
      <TCell flex={1}>
        <Button onClick={() => handleDeleteApiKey(id)} small>Delete</Button>
      </TCell>
    </TRow>
  );
};

const Header = () => (
  <TRow header>
    <TCell flex={2}>Name</TCell>
    <TCell flex={2}>Created at</TCell>
    <TCell flex={1}>Actions</TCell>
  </TRow>
);

const ApiKeys = () => {
  const { active, toggle } = useModal();
  const { loading, data } = useQuery(ME_QUERY, { ssr: false });
  const apiKeys = data && data.me && data.me.apiKeys;
  let content;
  if (loading) {
    content = <LoadingState />;
  } else if (!apiKeys.length) {
    content = <EmptyState message="No keys found" />;
  } else {
    content = (
      <div className="mt-3">
        <Header />
        {apiKeys.map(apiKey => <ApiKey key={apiKey.id} apiKey={apiKey} />)}
      </div>
    );
  }
  return (
    <Account title="API Keys">
      <Card title="API Keys">
        <Button onClick={toggle} small>Create a new key</Button>
        <CreateApiKeyModal active={active} toggle={toggle} />
        {content}
      </Card>
    </Account>
  );
};

export default withAuth(ApiKeys);
