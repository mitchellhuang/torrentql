import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Dashboard from '../../layouts/Dashboard';
import withAuth from '../../lib/withAuth';
import Torrent from '../../components/Torrent';
import { Row, Col } from '../../layouts/Structures';
import { ME_QUERY } from '../../apollo/queries';

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
  const columnHeaderNames = [
    'Name', 'Progress', 'Up Speed', 'Down Speed', 'Peers', 'Seeds',
  ];
  console.log(data.me.torrents);
  return (
    <div>
      <Row>
        {columnHeaderNames.map((ele, idx) => <Col key={ele} className={idx === 0 ? 'torrent-name' : null}>{ele}</Col>)}
      </Row>
      {data.me.torrents.map(torrent => <Torrent key={torrent.id} torrent={torrent} />)}
      <style jsx>{`
        
       `}</style>
    </div>
  );
};

const Torrents = () => (
  <Dashboard title="Torrents" noFooter>
    <TorrentsWithData />
  </Dashboard>
);

export default withAuth(Torrents);
