import React from 'react';
import { torrentStatus } from '../lib/constants';
import { Pause, Play } from 'react-feather';


const ProgressBar = ({
  progress,
  state,
}) => {
  const iconSize = 20;
  const background = progress > 0
    ? `linear-gradient(to right, var(--green) ${progress}%, var(--lightGreen) 0)`
    : 'var(--lightGray)';
  return (
    <div className="progress-bar">
      {state === torrentStatus.PAUSED && <Pause size={iconSize} className="icon" />}
      {state !== torrentStatus.PAUSED && <Play size={iconSize} className="icon" />}
      <div className="progress-bar-inner"/>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-bar :global(.icon) {
          fill: var(--blueGray);
        }
        .progress-bar-inner {
          width: 100%;
          height: 4px;
          margin-left: 5px;
          background: ${background};
        }
     `}</style>
    </div>
  );
};

export default ProgressBar;
