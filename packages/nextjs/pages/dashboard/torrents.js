import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { DELETE_TORRENT_MUTATION } from '../../apollo/mutations';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';
import Torrent from '../../components/Torrent';
import { ME_QUERY } from '../../apollo/queries';

const TorrentsViewChild = ({ data }) => {
  const [torrents, setTorrents] = useState(data.me.torrents);
  if (!torrents || !torrents.length) {
    return (
      <div>
        No torrents.
      </div>
    );
  }
  const useDeleteMutation = useMutation(DELETE_TORRENT_MUTATION);
  async function deleteTorrent(id) {
    await useDeleteMutation({
      variables: {
        id,
      },
      refetchQueries: setTorrents(torrents.filter(torrent => torrent.id !== id)),
    });
  }
  return (
    <div>
      {torrents.map(torrent => <Torrent onDeleteClick={() => deleteTorrent(torrent.id)} key={torrent.id} torrent={torrent} />)}
    </div>
  );
};

const TorrentsWithData = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  if (loading || !process.browser) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div>
        {JSON.stringify(error)}
      </div>
    );
  }
  if (!data.me.torrents.length) {
    return (
      <div>
        No torrents.
      </div>
    );
  }
  return (
    <div>
      <TorrentsViewChild data={data} />
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
