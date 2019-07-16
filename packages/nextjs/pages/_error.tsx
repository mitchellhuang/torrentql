import React from 'react';
import Main from '../layouts/Main';
import Link from 'next/link';

const Error = ({ statusCode }) => {
  return (
    <Main title={statusCode}>
      <div className="wrapper">
        <div className="error">
          <h1 className="mb-3">{statusCode}</h1>
          <h3 className="mb-3">
            {statusCode ? 'An error occurred on server.' : 'An error occurred on client.'}
          </h3>
          <p>
            <Link href="/">
              <a>Return home</a>
            </Link>
          </p>
        </div>
      </div>
      <style jsx>{`
        @media(min-width: 768px) {
          .wrapper {
            height: calc(100vh - 500px);
            align-items: center;
            max-width: 768px;
            padding: 75px 0;
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
