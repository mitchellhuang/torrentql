import React from 'react';
import Card from '../../components/Card';
import Account from '../../layouts/Account';
import withAuth from '../../lib/withAuth';

const Usage = () => (
  <Account>
    <h3 className="mb-3">Usage</h3>
    <div className="container">
      <Card>
        Data transfer out
        <img src="https://cloud.google.com/billing/docs/images/billing-reports3.png" alt="Cloud report"/>
      </Card>
      <Card>
        Storage
        <img src="https://cloud.google.com/billing/docs/images/billing-reports3.png" alt="Cloud report"/>
      </Card>
    </div>
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

export default withAuth(Usage);
