import React from 'react';
import Main from '../layouts/Main';

const Pricing: React.FunctionComponent<{}> = () => (
  <Main title="Pricing">
    <div className="wrapper">
      <h1 className="mb-3">Pricing</h1>
      <p className="mb-3">
        Pay only for what you use. There is no minimum fee. Estimate your monthly bill using our
        <a href="/calculator"> billing calculator »</a>
      </p>
      <h3 className="mb-3">Free Usage Tier</h3>
      <p className="mb-3">
        As part of the Free Usage Tier, you can retrieve up to 10 GB of data uploaded per month free. Restrictions
        apply; see offer terms for more details.
      </p>
      <h3 className="mb-3">Standard Pricing</h3>
      <div className="pricing">
        <div className="column">
          <h5 className="info">Tier</h5>
        </div>
        <div className="column">
          <h5 className="info">Standard (Hetzner)</h5>
        </div>
        <div className="column">
          <h5 className="info">Premium (OVH)</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">data transfer in</h5>
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
          <h5 className="info">data transfer out</h5>
        </div>
        <div className="column">
          <h5>$0.005 / GB</h5>
        </div>
        <div className="column">
          <h5>$0.01 / GB</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">storage</h5>
        </div>
        <div className="column">
          <h5>$0.005 / GB / Month</h5>
        </div>
        <div className="column">
          <h5>$0.01 / GB / Month</h5>
        </div>
      </div>
      <h3 className="mb-3 mt-3">FAQ</h3>
      <h4 className="mb-3">What is the difference between standard and premium?</h4>
      <p className="mb-3">
        Our standard network uses a cluster of 1Gb/s Hetzner servers in Germany. Our premium network uses a cluster of
        1Gb/s OVH servers in France. We do not allow public torrent seeding for the standard network.
      </p>
      <h4 className="mb-3">What is data transfer in?</h4>
      <p className="mb-3">
        Data transfer in is the amount of bandwidth used when leeching torrents.
      </p>
      <h4 className="mb-3">What is data transfer out?</h4>
      <p className="mb-3">
        Data transfer out is the amount of bandwidth used when seeding torrents and downloading files over HTTP.
      </p>
      <h4 className="mb-3">What is storage pricing?</h4>
      <p className="mb-3">
        Storage pricing is how much disk space you are using.
      </p>
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
      .column:first-child {
        margin-left: -3px;
      }
      .column:last-child {
        margin-right: -3px;
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
        color: var(--darkGray);
      }
      .disclaimer {
        font-size: 10px;
        font-weight: bold;
      }
      .column:first-child {
        background-color: #F5F7FA;
      }
    `}</style>
  </Main>
);

export default Pricing;
