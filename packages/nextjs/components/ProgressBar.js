import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const ProgressBar = ({
  className,
  primaryColor,
  secondaryColor,
  progress,  
  ...props
 }) => {
  let progressBarClass = classNames('progress-bar', {
  });
  progressBarClass = className ? `${progressBarClass} ${className}` : progressBarClass;
  //setting default value for color
  primaryColor = primaryColor || 'var(--primary)';
  secondaryColor = secondaryColor || 'var(--secondary)';
  return(
    <div className={progressBarClass}>
      <p className={progressBarClass} style={{textAlign: 'center'}}>
        {progress}%
      </p>
      <div className={progressBarClass}>
    	<style  jsx>{`
    	  .progress-bar{
          width: ${progress}%; 
          background: linear-gradient(to right, ${primaryColor} ,${secondaryColor});
          height: 1.35em;
          margin-top: -2.2em;
          border-radius: 0.375em;
        }
    	`}</style>
      </div>
    </div>
  );
};

export default ProgressBar;
