import React from 'react';

const ProgressBar = ({
  className,
  color,
  progress,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  return (
    <div>
      <div className={progressBarClass}>
        {progress.toFixed(2)}%
      </div>
      <style jsx>{`
        .progress-bar {
          width: ${progress}%;
          background-color: ${color || 'var(--primary)'};
          height: 20px;
          border-radius: 20px;
          text-align: center;
        }
     `}</style>
    </div>
  );
};

export default ProgressBar;
