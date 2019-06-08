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
          border-radius: 25px;
        }
        .status{
          width: 200px;
          display: inline;
        }
     `}</style>
    </div>
  );
};


export default ProgressBar;
