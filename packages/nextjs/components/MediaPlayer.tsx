import React from 'react';

const audioExtensions = ['mp3'];
const imageExtensions = ['png', 'jpg', 'gif'];
const textExtensions = ['txt', 'csv', 'pdf'];
const videoExtensions = {
  mp4: 'mp4',
  ogv: 'ogg',
  ogg: 'ogg',
  webm: 'webm',
};

const BrowserUnsupported = ({ mediaType, selectedFile }) => (
  <p>
    Your browser doesn't support HTML5 {mediaType}. Here is a <a href={selectedFile}>link to the {mediaType}</a>
    instead.
  </p>
);

const MediaPlayer = ({ selectedFile }) => {
  const ext = selectedFile.substring(selectedFile.lastIndexOf('.') + 1);
  if (audioExtensions.includes(ext)) {
    return (
      <audio controls>
        <source src={selectedFile} type="audio/mpeg"/>
        <BrowserUnsupported mediaType="audio" selectedFile={selectedFile}/>
      </audio>
    );
  }
  if (Object.keys(videoExtensions).includes(ext)) {
    return (
      <video controls>
        <source src={selectedFile} type={`video/${videoExtensions[ext]}`}/>
        <BrowserUnsupported mediaType="video" selectedFile={selectedFile}/>
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
      <img src={selectedFile} alt={selectedFile} width="100%"/>
    );
  }
  if (textExtensions.includes(ext)) {
    return (
      <iframe src={selectedFile} frameBorder="0" height="350px" width="100%" />
    );
  }
  return (
    <span>File type can't be played in browser :(. Try download instead.</span>
  );
};

export default MediaPlayer;
