
import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
// import {useQuery} from "react-apollo-hooks";
// import { GET_TORRENT_QUERY } from "../../apollo/queries";

const Torrents = () => {
  const router = useRouter();
  // const { loading, data, error } = useQuery(ME_QUERY, {
  //   ssr: false,
  //   pollInterval: 2000,
  // });
  return (
    <div>{router.query.torrentId}</div>
  );
};

export default withAuth(Torrents);
