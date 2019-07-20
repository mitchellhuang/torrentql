import React, { useState, Fragment } from 'react';
import { File as FileIcon, Folder, Download } from 'react-feather';

const directoryColor = '#A7B0BD';
const fileColor = '#51A4FB';

function directoryDive(dictionary, key, depth) {
  if (dictionary.type === 'file') {
    return (
      <Fragment key={key}>
        <File name={key} path={dictionary.path} depth={depth} />
      </Fragment>
    );
  }
  const contents = dictionary.contents;
  return (
    <Fragment key={key}>
      <Directory name={key} depth={depth}>
        {Object.keys(contents).map(key => directoryDive(contents[key], key, depth + 1))}
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
        <Folder className="folder" color={directoryColor} />
        <span className="name">{name}</span>
      </div>
      {expanded && children}
      <style jsx>{`
      .directory {
        display: flex;
        flex-direction: column;
        margin-left: ${offSet}px;
      }
      .directory :global(svg.folder) {
        fill: ${directoryColor};
      }
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .row:focus {
        outline:0;
      }
      .name {
        margin-left: 3px;
      }
      `}</style>
    </div>
  );
};

const File = ({ name, depth, path }) => (
  <div className="file">
    <FileIcon color={fileColor}/>
    <span className="name">{name}</span>
    <a href={`/files/${encodeURIComponent(path)}`}>Download <Download size={12}/></a>
    <style jsx>{`
      .file {
        margin-left: ${5 * (depth + 1)}px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      a {
        margin-left: 5px;
      }
      .name {
        margin-left: 3px;
      }
    `}</style>
  </div>
);

const FileExplorer = ({ torrent }) => {
  const fileContents = torrent.files.contents;
  const initialDir = Object.keys(fileContents)[0];
  return (
    <div className="file-explorer">
      {directoryDive(torrent.files.contents[initialDir], initialDir, 0)}
      <style>{`
        .file-explorer {
          border-radius: 5px;
          padding: 5px;
          max-height: 250px;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
};

export { FileExplorer as default, Directory, File };
