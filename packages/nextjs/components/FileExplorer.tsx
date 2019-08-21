import React, { useState, Fragment } from 'react';
import { File as FileIcon, Folder, Download } from 'react-feather';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_SELECTED_FILE_MUTATION } from '../apollo/mutations';
import { primary } from '../layouts/Global';

const directoryColor = '#A7B0BD';

function directoryDive(dictionary, key, depth, id) {
  if (dictionary.type === 'file') {
    return (
      <Fragment key={key}>
        <File name={key} path={dictionary.path} depth={depth} id={id} />
      </Fragment>
    );
  }
  const contents = dictionary.contents;
  return (
    <Fragment key={key}>
      <Directory name={key} depth={depth}>
        {Object.keys(contents).map(key => directoryDive(contents[key], key, depth + 1, id))}
      </Directory>
    </Fragment>
  );
}

const Directory = ({ name, depth, children }) => {
  const [expanded, toggle] = useState(false);
  const offSet = depth > 0 ? (depth * 5) + 5 : 0;
  return (
    <div className="directory">
      <div className="row" onClick={() => toggle(!expanded)} role="button" tabIndex={0}>
        <Folder className="folder" color={directoryColor}/>
        <span className="name">{name}</span>
      </div>
      {expanded && children}
      <style jsx>{`
      .directory {
        display: flex;
        flex-direction: column;
        margin-left: ${offSet}px;
        cursor: pointer;
      }
      .directory:not(:last-child) {
        margin-bottom: 5px;
      }
      .directory :global(.folder) {
        fill: ${directoryColor};
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
      .name {
        margin-left: 5px;
      }
      `}</style>
    </div>
  );
};

const File = ({ name, depth, path, id }) => {
  const filePath = `https://gra001.torrentql.com/${path}`;
  const [updateSelectedFile] = useMutation(UPDATE_SELECTED_FILE_MUTATION);
  const offset = depth > 0 ? (depth * 5) + 5 : 0;
  return (
    <div
      className="file"
      onClick={() => updateSelectedFile({ variables: { id, filePath } })}>
      <div className="name">
        <FileIcon color={primary} className="file-icon" />
        {name}
      </div>
      <a href={filePath}>
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
        }
        :global(.file-icon) {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

const FileExplorer = ({ torrent }) => {
  const fileContents = torrent.files.contents;
  const initialDir = Object.keys(fileContents)[0];
  return (
    <div className="file-explorer">
      {directoryDive(torrent.files.contents[initialDir], initialDir, 0, torrent.id)}
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
