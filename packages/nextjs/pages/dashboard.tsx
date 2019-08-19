import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { ME_QUERY } from '../apollo/queries';
import DashboardLayout from '../layouts/Dashboard';
import Card, { ICard } from '../components/Card';
import { TorrentHeader } from '../components/Torrent';

const NetworkGraph: React.FunctionComponent<ICard> = props => (
  <Card {...props}>
    <h5 className="mb-2">Network graph</h5>
    <div>DL: 0 MB/s</div>
    <div>UL: 0 MB/s</div>
  </Card>
);

const FilterByStatus: React.FunctionComponent<ICard> = props => (
  <Card {...props}>
    <h5 className="mb-2">Filter by status</h5>
  </Card>
);

const Sidebar = () => (
  <>
    <NetworkGraph className="mb-2" />
    <FilterByStatus />
  </>
);

const Actions: React.FunctionComponent<ICard> = () => (
  <Card className="mb-2">
  </Card>
);

const Dashboard = () => {
  const { loading, data, error } = useQuery(ME_QUERY, {
    ssr: false,
    pollInterval: 2000,
  });
  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Actions />
          <TorrentHeader torrents={[]} selected={[]} />
        </div>
        <style jsx>{`
          .dashboard {
            display: flex;
            flex-direction: column;
          }
          .sidebar {
            margin-bottom: 10px;
          }
          @media(min-width: 768px) {
            .dashboard {
              flex-direction: row;
            }
            .sidebar {
              min-width: 250px;
              margin-right: 10px;
              margin-bottom: 0;
            }
            .content {
              flex: 1;
            }
          }
        `}</style>
      </div>
      </DashboardLayout>
  );
};

export default Dashboard;
