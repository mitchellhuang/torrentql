import React from 'react';
import { Search as SearchIcon } from 'react-feather';
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
      <input type="text" placeholder="Search torrents" onChange={(e) => handleChange(e.target.value)}/>
      <style>{`
      .input-group {
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
}

const TorrentsSidebar = () => (
  <div className="torrents-sidebar">
    My name is borat. My wife, yes yes.
    <SearchInput/>
    <style>{`
      .torrents-sidebar {
        background-color: var(--darkBlue);
        color: var(--blueGray);;
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </div>
);

export default TorrentsSidebar;
