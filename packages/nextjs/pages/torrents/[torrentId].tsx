import React from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../lib/withAuth';
import { useQuery } from 'react-apollo-hooks';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import Main from '../../layouts/Main';
import Button from '../../components/Button';
import FileExplorer from '../../components/FileExplorer';

const audioExtensions = ['mp3'];
const videoExtensions = {
  mp4: 'mp4',
  ogv: 'ogg',
  webm: 'webm',
};

const FilePlayer = ({ id }) => {
  const { loading, data, error } = useQuery(GET_TORRENT_QUERY, {
    ssr: false,
    pollInterval: 2000,
    variables: {
      id: id,
    },
  });
  if (loading || error) return <span/>;
  const torrent = data.getTorrent;
  if (!torrent.selectedFile) return <span/>;
  const ext = torrent.selectedFile.substring(torrent.selectedFile.lastIndexOf('.') + 1);
  console.log(ext);
  if (audioExtensions.includes(ext)) {
    return (
      <audio controls>
        <source src={torrent.selectedFile} type="audio/mpeg"/>
        <p>
          Your browser doesn't support HTML5 audio. Here is a <a href={torrent.selectedFile}>link to the audio</a>
          instead.
        </p>
      </audio>
    );
  }
  if (Object.keys(videoExtensions).includes(ext)) {
    return (
      <video controls>
        <source src={torrent.selectedFile} type={`video/${videoExtensions[ext]}`}/>
        <p>
          Your browser doesn't support HTML5 video. Here is a <a href={torrent.selectedFile}>link to the video</a>
          instead.
        </p>
      </video>
    );
  }
  return (<span>File can't be played in browser :(. Try download instead.</span>);
};

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
        <Button href="/torrents" white className="back-button" animate>Back to torrents</Button>
        <h2 className="name">{torrent.name}</h2>
        <h3 className="mb-2">Files</h3>
        <div className="card">
          <FileExplorer torrent={torrent}/>
        </div>
        <br/>
        <FilePlayer id={torrent.id}/>
        <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .wrapper :global(.back-button) {
          width: 200px;
          margin-bottom: 10px;
        }
        .title {
          font-weight: bold;
        }
      `}</style>
      </div>
    </Main>
  );
};

export default withAuth(Torrent);
