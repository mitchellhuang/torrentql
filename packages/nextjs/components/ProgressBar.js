import React from 'react';

const ProgressBar = ({
  className,
  primaryColor,
  secondaryColor,
  progress,
}) => {
  const progressBarClass = className ? `progress-bar ${className}` : 'progress-bar';
  // setting default value for color
  primaryColor = primaryColor || 'var(--primary)';
  secondaryColor = secondaryColor || 'var(--secondary)';
  return (
    <div>
      <p className="progress-value">
        {progress}%
      </p>
      <div className={progressBarClass} />
      <style jsx>{`
        .progress-bar {
          width: ${progress}%; 
          background: linear-gradient(to right, ${primaryColor} ,${secondaryColor});
          height: 20px;
          margin-top: -34.5px;
          margin-bottom: 7.5;
          border-radius: 20px;
        }
        .progress-value {
          text-align: center;
        }
     `}</style>
    </div>
  );
};

export default ProgressBar;
