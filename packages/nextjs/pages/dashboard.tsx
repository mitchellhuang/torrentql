import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Compass, UploadCloud, DownloadCloud, Pause, Clock, AlertCircle, Loader } from 'react-feather';
import DashboardLayout from '../layouts/Dashboard';
import { ME_QUERY, GET_DASHBOARD_QUERY } from '../apollo/queries';
import { UPDATE_SEARCH_FILTER_MUTATION, UPDATE_STATUS_FILTER_MUTATION } from '../apollo/mutations';
import Torrent, { TorrentHeader } from '../components/Torrent';
import ToolBar from '../components/ToolBar';
import Input from '../components/Input';
import { torrentStatus } from '../lib/constants';

const NetworkGraph = props => (
  <div {...props}>
    <h5 className="mb-2">Network graph</h5>
    <p>DL: 0 MB/s</p>
    <p>UL: 0 MB/s</p>
  </div>
);

const filterByStatusItems = [{
  name: 'All',
  status: torrentStatus.ALL,
  icon: Compass,
}, {
  name: 'Seeding',
  status: torrentStatus.SEEDING,
  icon: UploadCloud,
}, {
  name: 'Downloading',
  status: torrentStatus.DOWNLOADING,
  icon: DownloadCloud,
}, {
  name: 'Paused',
  status: torrentStatus.PAUSED,
  icon: Pause,
}, {
  name: 'Queued',
  status: torrentStatus.QUEUED,
  icon: Clock,
}];

const FilterBySearch = (props) => {
  const [updateSearchFilter] = useMutation(UPDATE_SEARCH_FILTER_MUTATION);
  const handleChange = value => updateSearchFilter({
    variables: { searchFilter: value },
  });
  return (
    <div {...props}>
      <h5 className="mb-2">Filter by Search</h5>
      <Input
        id="search"
        type="text"
        placeholder="Search torrents..."
        onChange={e => handleChange((e.target as HTMLInputElement).value)}
      />
      <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        li:not(:last-child) {
          margin-bottom: 7.5px;
        }
        .name {
          margin-left: 10px;
        }
        .selected {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const FilterByStatus = ({
  statusFilter,
  ...props
}) => {
  const [updateStatusFilter] = useMutation(UPDATE_STATUS_FILTER_MUTATION);
  const handleChange = filter => updateStatusFilter({
    variables: { statusFilter: filter },
  });
  return (
    <div {...props}>
      <h5 className="mb-2">Filter by Status</h5>
      <ul>
        { filterByStatusItems.map(item => (
          <li
            key={item.name}
            onClick={() => handleChange(item.status)}
            className={statusFilter === item.status && 'selected'}>
            <item.icon size={18} />
            <span className="name">{item.name}</span>
          </li>
        )) }
      </ul>
      <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        li:not(:last-child) {
          margin-bottom: 7.5px;
        }
        .name {
          margin-left: 10px;
        }
        .selected {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const Actions = () => (
  <div>
  </div>
);

const Loading = () => (
  <div>
    <Loader size={35} />
    <h4 className="mt-2">Loading</h4>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 25px 0;
        color: var(--dark-gray);
      }
    `}</style>
  </div>
);

const Empty = () => (
  <div>
    <AlertCircle size={35} />
    <h4 className="mt-2">No torrents</h4>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 25px 0;
        color: var(--dark-gray);
      }
    `}</style>
  </div>
);

const Dashboard = () => {
  const { loading, data } = useQuery(ME_QUERY, { ssr: false, pollInterval: 2000 });
  const { data: { getDashboard } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  let torrents = data && data.me && data.me.torrents || [];
  let state;
  let content;
  if (loading) {
    state = <Loading />;
  } else if (!torrents.length) {
    state = <Empty />;
  } else {
    const { searchFilter, statusFilter, selectedTorrents } = getDashboard;
    if (searchFilter) {
      torrents = torrents.filter(torrent => torrent.name.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    if (statusFilter !== torrentStatus.ALL) {
      torrents = torrents.filter(torrent => torrent.state === statusFilter);
    }
    content = torrents.map(torrent => <Torrent key={torrent.id} torrent={torrent} />);
  }
  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard">
        <div className="sidebar">
          <NetworkGraph className="mb-3" />
          <FilterBySearch />
          <FilterByStatus statusFilter={getDashboard.statusFilter} />
        </div>
        <div className="content">
          <div className="inner">
            <ToolBar />
            <TorrentHeader torrents={torrents} selected={getDashboard.selectedTorrents || []} />
            {content}
          </div>
          {state}
        </div>
        <style jsx>{`
          .dashboard {
            display: flex;
            flex-direction: column;
          }
          .sidebar {
            margin-bottom: 15px;
          }
          .content {
            margin: 0 -15px;
          }
          @media(min-width: 768px) {
            .dashboard {
              flex-direction: row;
            }
            .sidebar {
              min-width: 250px;
              margin-right: 15px;
              margin-bottom: 0;
            }
            .content {
              flex: 1;
              margin: 0;
            }
            .inner {
              border: 1px solid #ddd;
              border-radius: 5px;
              overflow: hidden;
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
