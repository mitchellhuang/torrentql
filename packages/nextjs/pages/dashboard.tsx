import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Compass, UploadCloud, DownloadCloud, Pause, Clock } from 'react-feather';
import DashboardLayout from '../layouts/Dashboard';
import withAuth from '../lib/withAuth';
import { GET_TORRENTS_QUERY, DASHBOARD_QUERY } from '../apollo/queries';
import {
  UPDATE_SEARCH_FILTER_MUTATION,
  UPDATE_STATUS_FILTER_MUTATION,
  UPDATE_TRACKER_FILTER_MUTATION,
} from '../apollo/mutations';
import Torrent, { TorrentHeader } from '../components/Torrent';
import ToolBar from '../components/ToolBar';
import Input from '../components/Input';
import { LoadingState, EmptyState } from '../components/State';
import { torrentStatus } from '../lib/constants';
import colors from '../lib/colors';

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
        small
        noMargin
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
          color: ${colors.primary};
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
          color: ${colors.primary};
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const FilterByTracker = ({
  trackers,
  trackerFilter,
  ...props
}) => {
  const [updateTrackerFilter] = useMutation(UPDATE_TRACKER_FILTER_MUTATION);
  const handleChange = filter => updateTrackerFilter({
    variables: { trackerFilter: trackerFilter === filter ? '' : filter },
  });
  return (
    <div {...props}>
      <h5 className="mb-2">Filter by Tracker</h5>
      <ul>
        { Object.keys(trackers).map(item => (
          <li
            key={item}
            onClick={() => handleChange(item)}
            className={trackerFilter === item && 'selected'}>
            <span>{item} [{trackers[item]}]</span>
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
        .selected {
          color: ${colors.primary};
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const Dashboard = () => {
  const { loading, data } = useQuery(GET_TORRENTS_QUERY, { pollInterval: 2000 });
  const { data: { dashboard } } = useQuery(DASHBOARD_QUERY);
  if (!dashboard) {
    return null;
  }
  const { searchFilter, statusFilter, trackerFilter, selectedTorrents } = dashboard;
  let torrents = data && data.getTorrents || [];
  let state;
  let content;
  const trackers = {};
  if (loading) {
    state = <LoadingState />;
  } else if (!torrents.length) {
    state = <EmptyState message="No torrents found" />;
  } else {
    torrents.forEach((torrent) => {
      if (trackers[torrent.trackerHost]) {
        trackers[torrent.trackerHost] += 1;
      } else {
        trackers[torrent.trackerHost] = 1;
      }
    });
    if (searchFilter) {
      torrents = torrents.filter(torrent => torrent.name.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    if (statusFilter !== torrentStatus.ALL) {
      torrents = torrents.filter(torrent => torrent.state === statusFilter);
    }
    if (trackerFilter) {
      torrents = torrents.filter(torrent => torrent.trackerHost === trackerFilter);
    }
    content = torrents.map(torrent =>
      <Torrent
        key={torrent.id}
        torrent={torrent}
        selectedTorrents={selectedTorrents} />,
    );
  }
  return (
    <DashboardLayout title="Dashboard" noMaxWidth>
      <div className="dashboard">
        <div className="sidebar">
          <NetworkGraph className="mb-3" />
          <FilterBySearch className="mb-3" />
          <FilterByStatus className="mb-3" statusFilter={statusFilter} />
          <FilterByTracker trackers={trackers} trackerFilter={trackerFilter} />
        </div>
        <div className="content">
          <div className="inner">
            <ToolBar selectedTorrents={selectedTorrents} />
            <TorrentHeader torrents={torrents} selected={selectedTorrents} />
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
            overflow: hidden;
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
              border: 1px solid ${colors.border};
              border-radius: 5px;
              overflow: hidden;
            }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
