import React from 'react';
import Button from '../../components/Button';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Logout = () => (
  <Account>
    <h3 className="mb-3">Logout</h3>
    <Button href="/logout" block>
      Logout
    </Button>
    <style jsx>{`
      .logout {
        max-width: 350px;
        margin: 0 auto;
      }
    `}</style>
    <style jsx>{`
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
