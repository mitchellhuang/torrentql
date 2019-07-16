import React from 'react';
import Main from '../layouts/Main';

const Pricing: React.FC<null> = () => (
  <Main title="Pricing">
    <div className="wrapper">
      <h1 className="mb-2">TorrentQL Pricing</h1>
      <span className="mb-2">
        Pay only for what you use. There is no minimum fee. Estimate your monthly bill using our
        <a href="/calculator"> billing calculator »</a>
      </span>
      <h3 className="mb-2">TorrentQL Free Usage Tier*</h3>
      <div className="mb-2">
        As part of the TorrentQL Free Usage Tier, you can retrieve up to 10 GB of data uploaded per month free<b>*</b>.
        The free tier allowance can be used at any time during the month and applies to Standard retrievals.
      </div>
      <h3 className="mb-2">Storage pricing</h3>
      <div className="mb-2">
        Seeding torrents will be charged <b>$.005</b> per GB per month.
      </div>
      <h3 className="mb-2">
        Torrent Data Storage Pricing
      </h3>
      <div className="pricing">
        <div className="column">
          <h5 className="info">Service</h5>
        </div>
        <div className="column">
          <h5 className="info">Up to 10 GB / Month</h5>
        </div>
        <div className="column">
          <h5 className="info">Next 9.9 GB / Month</h5>
        </div>
        <div className="column">
          <h5 className="info">Next 40 GB / Month</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">Torrents downloaded</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">All data transfer in</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">Pricing Rate</h5>
        </div>
        <div className="column">
          <h5>$0 per GB</h5>
        </div>
        <div className="column">
          <h5>$0.05 per GB</h5>
        </div>
        <div className="column">
          <h5>$0.07 per GB</h5>
        </div>
      </div>
      <div className="disclaimer">
        * Your usage for the free tier is calculated each month and will automatically be applied to your bill – unused
        monthly usage will not roll over. Restrictions apply; see offer terms for more details.
      </div>
    </div>
    <style jsx>{`
      .wrapper {
        max-width: 768px;
      }
      .column {
        justify-content: center;
        background-color: #EDF1F5;
        margin: 3px;
        display: flex;
        width: 100%;
        align-items: center;
      }
      .pricing {
        background-color: var(--white);
        display: flex;
        height: 75px;
      }
      .info, h5 {
        font-weight: normal;
        font-size: 12pt;
        text-align: center;
      }
      .info {
        font-weight: bolder;
      }
      .disclaimer {
        margin-top: 15px;
        font-size: 10px;
        font-weight: bold;
      }
      .column:nth-child(even) {
        background-color: #F5F7FA;
      }
    `}</style>
  </Main>
);

export default Pricing;
