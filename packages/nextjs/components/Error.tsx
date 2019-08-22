import React from 'react';
import colors from '../lib/colors';

const Error = ({
  error,
}) => {
  if (error) {
    return (
      <div className="error">
        {error}
        <style jsx>{`
          .error {
            color: ${colors.error};
            margin-bottom: 15px;
          }
          .error::first-letter {
            text-transform: capitalize;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

export default Error;
