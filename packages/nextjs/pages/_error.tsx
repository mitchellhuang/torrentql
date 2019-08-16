import React from 'react';
import Main from '../layouts/Main';

const Error = ({ statusCode }) => {
  return (
    <Main title={statusCode}>
      <div className="wrapper">
        <div className="error">
          <h1 className="mb-3">{statusCode}</h1>
          <h3 className="mb-3">
            An error occurred.
          </h3>
          <p>
            <a href="/" className="return-home">Return home</a>
          </p>
        </div>
      </div>
      <style jsx>{`
        .return-home {
          text-transform: uppercase;
          font-weight: 600;
        }
        @media(min-width: 768px) {
          .wrapper {
            max-width: 768px;
            padding: 100px 0;
          }
          .error {
            text-align: center;
          }
        }
      `}</style>
    </Main>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
