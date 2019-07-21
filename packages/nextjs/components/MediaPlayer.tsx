import React from 'react';

const audioExtensions = ['mp3'];
const videoExtensions = {
  mp4: 'mp4',
  ogv: 'ogg',
  ogg: 'ogg',
  webm: 'webm',
};
const imageExtensions = ['png', 'jpg', 'gif'];
const textExtensions = ['txt', 'csv', 'pdf'];

const MediaPlayer = ({ selectedFile }) => {
  const ext = selectedFile.substring(selectedFile.lastIndexOf('.') + 1);
  if (audioExtensions.includes(ext)) {
    return (
      <audio controls>
        <source src={selectedFile} type="audio/mpeg"/>
        <p>
          Your browser doesn't support HTML5 audio. Here is a <a href={selectedFile}>link to the audio</a>
          instead.
        </p>
      </audio>
    );
  }
  if (Object.keys(videoExtensions).includes(ext)) {
    return (
      <video controls>
        <source src={selectedFile} type={`video/${videoExtensions[ext]}`}/>
        <p>
          Your browser doesn't support HTML5 video. Here is a <a href={selectedFile}>link to the video</a>
          instead.
        </p>
        <style jsx>{`
          video {
            width: 100%;
          }
        `}</style>
      </video>
    );
  }
  if (imageExtensions.includes(ext)) {
    return (
      <>
        <img src={selectedFile} alt={selectedFile}/>
        <style jsx>{`
          img {
            width: 100%;
          }
        `}</style>
      </>
    );
  }
  if (textExtensions.includes(ext)) {
    return (
      <div id="list">
        <p>
          <iframe src={selectedFile} frameBorder="0" />
        </p>
        <style jsx>{`
          iframe {
            height: 350px;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
  return (<span>File can't be played in browser :(. Try download instead.</span>);
};

export default MediaPlayer;
