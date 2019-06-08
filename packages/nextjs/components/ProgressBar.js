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
          text-align: center;
          min-width: 50px;
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
