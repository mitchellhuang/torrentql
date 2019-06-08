import React from 'react';

const ProgressBar = ({
  className,
  color,
  progress,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div className="status">
      <div className={progressBarClass}>
        <div className="status">
          {progress.toFixed(2)}%
        </div>
      </div>
      <style jsx>{`
        .progress-bar {
          width: ${progress}%;
          background-color: ${color || 'var(--primary)'};
          height: 20px;
          border-radius: 20px;
          text-align: center;
          display: inline;
        }
        .status{
          width: 100%;
          display: inline;
        }
     `}</style>
    </div>
  );
};


export default ProgressBar;
