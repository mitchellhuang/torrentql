import React, { useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import Main from '../../layouts/Main';
import { Folder, File as FileIcon } from 'react-feather';
import Button from '../../components/Button';

const Torrent = () => {
  const router = useRouter();
  const { loading, data, error } = useQuery(GET_TORRENT_QUERY, {
    ssr: false,
    pollInterval: 2000,
    variables: {
      id: router.query.torrentId,
    },
  });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  const torrent = data.getTorrent;
  const fileContents = torrent.files.contents;
  const initialDir = Object.keys(fileContents)[0];
  return (
    <Main title={torrent.name}>
      <div className="wrapper">
        <Button href="/torrents" white className="back-button" animate>Back to torrents</Button>
        <h2 className="name">{torrent.name}</h2>
        <h3 className="mb-2">Files</h3>
        <div className="card">
          {directoryDive(torrent.files.contents[initialDir], initialDir, 0)}
        </div>
        <br/>
        <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        :global(a.back-button) {
          width: 200px;
          margin-bottom: 10px;
        }
        .title {
          font-weight: bold;
        }
        .card {
          border: 2px solid var(--darkGray);
          border-radius: 5px;
          padding: 5px;
          height: 200px;
          max-width: 600px;
          overflow: scroll;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
        background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
        background: #555;
        }
      `}</style>
      </div>
    </Main>
  );
};

 function directoryDive(dictionary, key, depth) {
  if (dictionary.type === 'file') {
    return (
    <div key={key}>
      <File name={key} depth={depth} />
    </div>
    );
  }
  const contents = dictionary.contents;
  return (
    <div key={key}>
      <Directory name={key} depth={depth}>
        {Object.keys(contents).map(key => directoryDive(contents[key], key, depth + 1))}
      </Directory>
    </div>
  );
}

const Directory = ({ name, depth, children }) => {
  const [expanded, toggle] = useState(false);
  const offSet = depth > 0 ? (depth * 5) + 5 : 0;
  return (
    <div className="directory">
      <div className="row" onClick={() => toggle(!expanded)} role="button" tabIndex={0}>
        <Folder className="folder" color="#a7b0bd" />
        <span className="name">{name}</span>
      </div>
      {expanded && children}
      <style jsx>{`
      .directory {
        display: flex;
        flex-direction: column;
        margin-left: ${offSet}px;
      }
      :global(svg.folder) {
        fill: #a7b0bd;
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

const File = ({ name, depth }) => (
  <div className="file">
    <FileIcon color="#51A4FB"/>
    <span className="name">{name}</span>
    <style jsx>{`
      .file {
        margin-left: ${5 * (depth + 1)}px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .name {
        margin-left: 3px;
      }
    `}</style>
  </div>
)
export default withAuth(Torrent);
