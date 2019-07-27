import React from 'react';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import { withRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';
import { useQuery } from 'react-apollo-hooks';
import withAuth from '../../lib/withAuth';
import { GET_TORRENT_QUERY } from '../../apollo/queries';
import { Unstyled } from '../torrents';
import FileExplorer from '../../components/FileExplorer';
import Dashboard from '../../layouts/Dashboard';
import MediaPlayer from '../../components/MediaPlayer';
import Card from '../../components/Card';
// const PrettyPrintJson = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
// <PrettyPrintJson data={torrent} />
const TorrentInfo = ({ torrent }) =>  (
  <div>
    <div className="content">
      <div className="box">
        <div className="label">ID</div>
        <div>{torrent.id}</div>
      </div>
      <div className="box">
        <div className="label">Hash</div>
        <div>{torrent.hash}</div>
      </div>
      <div className="box">
        <div className="label">State</div>
        <div>{torrent.state.toUpperCase()}</div>
      </div>
    </div>
    <div className="content">
      <div className="box">
        <div className="label">Progress</div>
        <div>{torrent.progress}</div>
      </div>
      <div className="box">
        <div className="label">Ratio</div>
        <div>{torrent.ratio}</div>
      </div>
      <div className="box">
        <div className="label">Upload Speed: </div>
        <div>{prettyBytes(torrent.uploadSpeed)}/s</div>
      </div>
    </div>
    <div className="content">
      <div className="box">
        <div className="label">Download Speed</div>
        <div>{prettyBytes(torrent.downloadSpeed)}/s</div>
      </div>
      <div className="box">
        <div className="label">Eta</div>
        <div>{torrent.eta}</div>
      </div>
      <div className="box">
        <div className="label">Number of Peers</div>
        <div>{torrent.numPeers}</div>
      </div>
    </div>
    <div className="content">
      <div className="box">
        <div className="label">Number of Seeds</div>
        <div>{torrent.numSeeds}</div>
      </div>
      <div className="box">
        <div className="label">Total Peers</div>
        <div>{torrent.totalPeers}</div>
      </div>
      <div className="box">
        <div className="label">Total Seeds</div>
        <div>{torrent.totalSeeds}</div>
      </div>
    </div>
    <div className="content">
      <div className="box">
        <div className="label">Total Wanted</div>
        <div>{prettyBytes(torrent.totalWanted)}</div>
      </div>
      <div className="box">
        <div className="label">Total Downloaded</div>
        <div>{prettyBytes(torrent.totalDownloaded)}</div>
      </div>
      <div className="box">
        <div className="label">Tracker</div>
        <div>{torrent.tracker}</div>
      </div>
    </div>
    <div className="content">
      <div className="box">
        <div className="label">Tracker Host</div>
        <div>{torrent.trackerHost}</div>
      </div>
      <div className="box">
        <div className="label">Tracker Status</div>
        <div>{torrent.trackerStatus}</div>
      </div>
      <div className="box">
        <div className="label">Total Uploaded</div>
        <div>{prettyBytes(torrent.totalUploaded)}</div>
      </div>
    </div>
    <style jsx>{`
       .label {
         font-weight: 600;
         margin-bottom: 5px;
       }
       .box {
         flex: 1;
       }
       .content {
         display: flex;
         flex-direction: row;
         margin-bottom: 10px;
       }
    `}</style>
  </div>
  );

const TorrentWithData = ({ id }) => {
  const { loading, data, error } = useQuery(GET_TORRENT_QUERY, {
    ssr: false,
    pollInterval: 2000,
    variables: { id },
  });
  if (loading || !process.browser) {
    return <Unstyled message="Loading..." />;
  }
  if (error) {
    return <Unstyled message={JSON.stringify(error)} />;
  }
  const torrent = data.getTorrent;
  return (
    <>
    <div className="mb-2">
      <Link href="/torrents">
        <a>
          <ArrowLeft/>
        </a>
      </Link>
    </div>
    <Card className="mb-3">
      <h3>{torrent.name}</h3>
    </Card>
      <Card title="Info" className="mb-3" >
        <div className="info">
          <TorrentInfo torrent={torrent}/>
        </div>
      </Card>
      <Card title="Files">
        <FileExplorer torrent={torrent}/>
      </Card>
      {torrent.selectedFile && <MediaPlayer selectedFile={torrent.selectedFile}/>}
      <style jsx>{`
        .name {
          margin-bottom: 15px;
        }
        .info:global(pre) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

const Torrent = ({
  router,
}) => {
  const id = router.query.torrentId;
  return (
    <Dashboard title={id} noFooter>
      <TorrentWithData id={id}/>
    </Dashboard>
  );
};

export default withAuth(withRouter(Torrent));
