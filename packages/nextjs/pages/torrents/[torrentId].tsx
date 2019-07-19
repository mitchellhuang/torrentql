import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import Main from '../../layouts/Main';
import Link from 'next/link';
import { Folder, File as FileIcon } from 'react-feather';

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
        <Link href="../torrents">
          <a>Back to torrents</a>
        </Link>
        <h2 className="name">{torrent.name}</h2>
        <h3>Contents:</h3>
        {directoryDive(torrent.files.contents[initialDir], initialDir, 0)}
        <br/>
        <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .title {
          font-weight: bold;
        }
      `}</style>
      </div>
    </Main>
  );
};

   function directoryDive(dictionary,key, depth) {
        if (dictionary.type === 'file') {
          return (
            <div key={key}>
              <File name={key} depth={depth} />
            </div>
          )
        } else if (dictionary.type === 'dir') {
          const contents = dictionary.contents;
          if (contents) {
            return (
              <div key={key}>
                <Directory name={key} depth={depth} />
                {Object.keys(contents).map(key => directoryDive(contents[key], key, depth + 1))}
              </div>
            )
          }
        } 
      }

const Directory = ({ name, depth }) => {
  const offSet = depth > 0 ? (depth * 20) + 20 : 0;
  return (
  <div className="directory">
    <Folder className="folder" color="blue" />
    <span className="name">{name}</span>
    <style jsx>{`
      .directory {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: ${offSet}px;
      }
      .name {
        margin-left: 3px;
      }
    `}</style>
  </div>
)
};

const File = ({ name, depth }) => (
  <div className="file">
    <FileIcon color="blue"/>
    <span className="name">{name}</span>
    <style jsx>{`
      .file {
        margin-left: ${20 * (depth + 1)}px;
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
