import React from 'react';

const Error = ({
  error,
}) => {
  if (error) {
    return (
      <div className="error">
        {error}
        <style jsx>{`
          .error {
            color: var(--error);
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
