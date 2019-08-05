import React from 'react';
import { Search as SearchIcon, Aperture, DownloadCloud, UploadCloud, Pause, Clock } from 'react-feather';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { UPDATE_SEARCH_FILTER_MUTATION, UPDATE_STATUS_FILTER_MUTATION } from '../apollo/mutations';
import { GET_DASHBOARD_QUERY } from '../apollo/queries';
import { torrentStatus } from '../lib/constants';

const SearchInput = () => {
  const [updateSearchFilter] = useMutation(UPDATE_SEARCH_FILTER_MUTATION);
  const handleChange = inputValue => updateSearchFilter({
    variables: { searchFilter: inputValue },
  });
  return (
    <div className="input-group">
      <SearchIcon size={20} />
      <input type="text" placeholder="Search torrents" onChange={e => handleChange(e.target.value)}/>
      <style jsx>{`
      .input-group {
        margin-top: 50px;
        padding-left: 10px;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: var(--darkDarkBlue);
      }
      input {
        margin-left: 10px;
        background-color: var(--darkDarkBlue);
        color: var(--blueGray);
        border: 0px;
        height: 30px;
        outline: none;
      }
      ::placeholder {
        color: var(--blueGray);
        font-style: italic;
      }
    `}</style>
    </div>
  );
};

const StatusFilters = () => {
  const [updateStatusFilter] = useMutation(UPDATE_STATUS_FILTER_MUTATION);
  const { data: { getDashboard: { statusFilter } } } = useQuery(GET_DASHBOARD_QUERY, { ssr: false });
  const handleChange = filter => updateStatusFilter({
    variables: { statusFilter: filter },
  });
  const commonProps = status => ({
    role: 'button',
    tabIndex: 0,
    onClick: () => handleChange(status),
  });
  return (
    <div className="status-filters">
      <h5 className="mb-2">Filter by status</h5>
      <div className={`row ${torrentStatus.ALL}`} {...commonProps(torrentStatus.ALL)}>
        <Aperture size={22} />
        <span>All</span>
      </div>
      <div className={`row ${torrentStatus.SEEDING}`} {...commonProps(torrentStatus.SEEDING)}>
        <UploadCloud size={22} />
        <span>Seeding</span>
      </div>
      <div className={`row ${torrentStatus.DOWNLOADING}`} {...commonProps(torrentStatus.DOWNLOADING)}>
        <DownloadCloud size={22} />
        <span>Downloading</span>
      </div>
      <div className={`row ${torrentStatus.PAUSED}`} {...commonProps(torrentStatus.PAUSED)}>
        <Pause size={22} />
        <span>Paused</span>
      </div>
      <div className={`row ${torrentStatus.QUEUED}`} {...commonProps(torrentStatus.QUEUED)}>
        <Clock size={22} />
        <span>Queued</span>
      </div>
      <style jsx>{`
      .status-filters {
        padding: 15px;
      }
      h5 {
        color: var(--blueGray);
      }
      .row {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
      }
      .${statusFilter} {
        color: var(--primary);
      }
      span {
        margin-left: 10px;
      }
    `}</style>
    </div>
  );
};

const TorrentsSidebar = () => (
  <div className="torrents-sidebar">
    <SearchInput />
    <StatusFilters />
    <style jsx>{`
      .torrents-sidebar {
        display: none;
      }
      @media(min-width: 768px) {
        .torrents-sidebar {
          background-color: var(--darkBlue);
          color: var(--blueGray);;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 86px);
        }
      }
    `}</style>
  </div>
);

export default TorrentsSidebar;
