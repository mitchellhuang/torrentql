import React from 'react';
import Button from '../../components/Button';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Logout = () => (
  <Account>
    <div className="logout">
      <h3 className="mb-3">Logout</h3>
      <Button href="/logout" block>
        Logout
      </Button>
    </div>
    <style jsx>{`
      .logout {
        max-width: 400px;
        margin: 0 auto;
      }
      .container {
        display: flex;
      }
      .container div {
        flex: 1;
      }
      img {
        width: 100%;
      }
    `}</style>
  </Account>
);

export default withAuth(Logout);
