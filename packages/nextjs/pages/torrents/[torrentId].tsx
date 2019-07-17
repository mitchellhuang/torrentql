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
  return (
    <Main title={torrent.name}>
      <div className="wrapper">
        <Link href="../torrents">
          <a>Back to torrents</a>
        </Link>
        <h2 className="name">{torrent.name}</h2>
        <h3>Contents:</h3>
        <h5>{JSON.stringify(torrent.files.contents.size)}</h5>
        <Directory name={torrent.name} />
        <File name={torrent.name} />
        <h5>{JSON.stringify(torrent.files.contents)}</h5>
        <br/>
        <h5>{JSON.stringify(torrent.files)}</h5>
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

const Directory = ({ name }) => (
  <div className="directory">
    <Folder className="folder" color="blue" />
    <div>{name}</div>
    <style jsx>{`
      .directory {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `}</style>
  </div>
);

const File = ({ name }) => (
  <div className="file">
    <line></line><FileIcon color="blue"/>
    <div> {name}</div>
    <style jsx>{`
      .file {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `}</style>
  </div>
)
export default withAuth(Torrent);
