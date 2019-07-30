import React from 'react';
import {
  Search as SearchIcon,
  Aperture,
  Download,
  Check,
  Square,
  Activity,
  TrendingDown,
  CloudDrizzle,
} from 'react-feather';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_FILTER_MUTATION } from '../apollo/mutations';

const SearchInput = () => {
  const [updateFilter] = useMutation(UPDATE_FILTER_MUTATION);
  const handleChange = inputValue => updateFilter({
    variables: {
      filter: inputValue,
    },
  });
  return (
    <div className="input-group">
      <SearchIcon size={20}/>
      <input type="text" placeholder="Search torrents" onChange={e => handleChange(e.target.value)}/>
      <style>{`
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

const StatusFilters = () => (
  <div className="status-filters">
    <h5 className="mb-2">Filter by status</h5>
    <div className="row selected">
      <Aperture size={22}/>
      <span>All</span>
    </div>
    <div className="row">
      <Download size={22}/>
      <span>Download</span>
    </div>
    <div className="row">
      <Check size={22}/>
      <span>Complete</span>
    </div>
    <div className="row">
      <Square size={22}/>
      <span>Stopped</span>
    </div>
    <div className="row">
      <Activity size={22}/>
      <span>Active</span>
    </div>
    <div className="row">
      <TrendingDown size={22}/>
      <span>Inactive</span>
    </div>
    <h5 className="mb-2 mt-4">Filter by host</h5>
    <div className="row">
      <CloudDrizzle size={22}/>
      <span>christianbooks.net</span>
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
      }
      span {
        margin-left: 10px;
      }
      .selected {
        color: var(--primary);
      }
    `}</style>
  </div>
);

const TorrentsSidebar = () => (
  <div className="torrents-sidebar">
    <SearchInput/>
    <StatusFilters/>
    <style>{`
      .torrents-sidebar {
        background-color: var(--darkBlue);
        color: var(--blueGray);;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `}</style>
  </div>
);

export default TorrentsSidebar;
