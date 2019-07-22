import React from 'react';
import Main from '../layouts/Main';

const Pricing: React.FunctionComponent<{}> = () => (
  <Main title="Pricing">
    <div className="wrapper">
      <h1 className="mb-3">Pricing</h1>
      <p className="mb-3">
        Pay only for what you use. There is no minimum fee. Estimate your monthly bill using our
        billing calculator.
      </p>
      <h3 className="mb-3">Free Usage Tier</h3>
      <p className="mb-3">
        As part of our Always Free Usage Tier, your first 5 GB of storage per month is always free.
      </p>
      <h3 className="mb-3">Table</h3>
      <div className="pricing">
        <div className="column">
          <h5 className="info">Region</h5>
        </div>
        <div className="column">
          <h5 className="info">eu-west-1</h5>
        </div>
        <div className="column">
          <h5 className="info">eu-west-2</h5>
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
          <h5>$0.01 / GB</h5>
        </div>
        <div className="column">
          <h5>$0.005 / GB</h5>
        </div>
      </div>
      <div className="pricing">
        <div className="column">
          <h5 className="info">storage</h5>
        </div>
        <div className="column">
          <h5>$0.01 / GB / Month</h5>
        </div>
        <div className="column">
          <h5>$0.005 / GB / Month</h5>
        </div>
      </div>
      <h3 className="mb-3 mt-3">FAQ</h3>
      <h4 className="mb-3">What is the difference between eu-west-1 and eu-west-2?</h4>
      <p className="mb-3">
        eu-west-1 is our premium network located in France (OVH GRA1).<br />
        eu-west-2 is our standard network located in Germany (Hetzner FN1).
      </p>
      <h4 className="mb-3">What is data transfer in?</h4>
      <p className="mb-3">
        Data transfering in to our servers. Includes torrent download traffic.
      </p>
      <h4 className="mb-3">What is data transfer out?</h4>
      <p className="mb-3">
        Data transfering out from our servers. Includes torrent seeding traffic and HTTPS download traffic.
      </p>
      <h4 className="mb-3">What is storage?</h4>
      <p className="mb-3">
        Storage is how much disk space you are using per month.
      </p>
      <h4 className="mb-3">How often is billing calculated?</h4>
      <p className="mb-3">
        Billing for all services is calculated in one-second increments.
      </p>
      <h4 className="mb-3">How often is my account balance charged?</h4>
      <p className="mb-3">
        Your account balance is charged every day at 12:00AM UTC.
      </p>
      <h4 className="mb-3">What happens if my account balance is too low?</h4>
      <p className="mb-3">
        Your torrents will be forced into a paused state.
      </p>
      <h4 className="mb-3">Do you allow public trackers?</h4>
      <p>
        Public trackers are only allowed in region eu-west-1.
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
