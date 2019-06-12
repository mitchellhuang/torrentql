import React from 'react';

const ProgressBar = ({
  className,
  color,
  progress,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div className="status rounded mt-1">
      <div className={`${progressBarClass} rounded`}>
        <span>
          {progress.toFixed(2)}%
        </span>
      </div>
      <style jsx>{`
        .progress-bar {
          width: ${progress}%;
          background-color: ${color || 'var(--primary)'};
          height: 20px;
          background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
          background-size: 1rem 1rem;
          animation-name: progress-bar-stripes;
          animation-duration: 3s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          text-align: center;
          min-width: 50px;
          display: flex;
          flex-direction: row;
        }
        @keyframes progress-bar-stripes {
          from { background-position: 115px 0; }
          to { background-position: 0 0; }
        }
        .rounded {
          border-radius: 15px;
        }
        .status{
          border: 2px solid lightgray;
        }
     `}</style>
    </div>
  );
};

export default ProgressBar;
