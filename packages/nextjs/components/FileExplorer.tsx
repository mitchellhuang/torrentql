import React, { useState } from 'react';
import { File as FileIcon, Folder, Download } from 'react-feather';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_SELECTED_FILE_MUTATION } from '../apollo/mutations';
import colors from '../lib/colors';

const directoryDive = (files, depth, id) => {
  if (files.type === 'file') {
    return (
      <File
        key={files.name}
        name={files.name}
        depth={depth}
        id={id}
        url={files.url}
      />
    );
  }
  return (
    <Directory
      key={files.name}
      name={files.name}
      depth={depth}
      url={files.url}
    >
      {Object.values(files.children).map(files => directoryDive(files, depth + 1, id))}
    </Directory>
  );
};

const Directory = ({ name, depth, children, url }) => {
  const [expanded, toggle] = useState(false);
  const offset = depth > 0 ? (depth * 5) + 5 : 0;
  return (
    <div className="directory">
      <div className="row" onClick={() => toggle(!expanded)} role="button" tabIndex={0}>
        <Folder className="folder" color={colors.primary.toString()} />
        <span className="name">{name}</span>
        <a href={url} target="_blank">
          <span className="download">Download</span>
          <Download size={12}/>
        </a>
      </div>
      {expanded && children}
      <style jsx>{`
      .directory {
        display: flex;
        flex-direction: column;
        margin-left: ${offset}px;
        cursor: pointer;
      }
      .directory:not(:last-child) {
        margin-bottom: 5px;
      }
      .directory :global(.folder) {
        fill: ${colors.primary};
      }
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: ${expanded && '5px'};
      }
      .row:focus {
        outline:0;
      }
      .download {
        margin-right: 5px;
      }
      a {
        margin-left: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .name {
        margin-left: 5px;
      }
      `}</style>
    </div>
  );
};

const File = ({ name, depth, id, url }) => {
  const [updateSelectedFile] = useMutation(UPDATE_SELECTED_FILE_MUTATION);
  const offset = depth > 0 ? (depth * 5) + 5 : 0;
  return (
    <div
      className="file"
      onClick={() => updateSelectedFile({ variables: { id, url } })}>
      <FileIcon color={colors.primary.toString()} className="file-icon" />
      <span className="name">{name}</span>
      <a href={url} target="_blank">
        <span className="download">Download</span>
        <Download size={12}/>
      </a>
      <style jsx>{`
        .file {
          margin-left: ${offset}px;
          display: flex;
          flex-direction: row;
          align-items: center;
          word-wrap: normal;
          cursor: pointer;
        }
        .file:not(:last-child) {
          margin-bottom: 5px;
        }
        .download {
          margin-right: 5px;
        }
        a {
          margin-left: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .name {
          white-space: nowrap;
          display: flex;
          align-items: center;
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

const FileExplorer = ({ torrent }) => {
  const id = torrent.id;
  const files = torrent.files;
  return (
    <div className="file-explorer">
      {directoryDive(files, 0, id)}
      <style jsx>{`
        .file-explorer {
          border-radius: 5px;
          max-height: 250px;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export { FileExplorer as default, Directory, File };
