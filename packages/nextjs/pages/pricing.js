import React from 'react';
import Link from 'next/link';
import Main from '../layouts/Main';
import LoginForm from '../forms/LoginForm';

const Pricing = () => (
  <>
  <Main title="Pricing">
    <div className="wrapper">
      <h1 className="spacing">Torrentql Pricing</h1>
        <span className="spacing">
          Pay only for what you use. There is no minimum fee. 
          Estimate your monthly bill using our 
          billing calculator<a href="/calculator">»</a>
        </span>
     <h3 className="spacing">Torrentql Free Usage Tier*</h3>
     <span className="mb-2">
       As part of the Torrentql Free Usage Tier, you can retrieve up to 
       10 GB of data uploaded per month free. The free tier allowance 
       can be used at any time during the month and applies to Standard 
       retrievals. * Your usage for the free tier is calculated each 
       month and will automatically be applied to your bill 
       – unused monthly usage will not roll over. Restrictions apply; 
       see offer terms for more details.
     </span>
     <h3>Storage pricing</h3>
     <div className='mb-2'>
        <hr/>
          $0.005 per GB / Month
        <hr/>
     </div>
    <h3 className="mb-2">
      Torrent Data Storage Pricing
    </h3>
    <div className="pricing row">
      <div className="column">
        <p className="info">
          Service
        </p>
      </div>
      <div className="column">
        <p className="info">
          Pricing-Rate
        </p>
      </div>
    </div>
    <div className="pricing row mb-2">
      <div className="column">
        <em className="info">
          Standard Flat Rate
        </em>
      </div>
      <div className="column">
        <h5>
          $0.033 per GB
        </h5>
      </div>
    </div>
    <h3 className="mb-2">Data Storage Pricing</h3>
    <div className="pricing row">
      <div className="column"/>
      <div className="column">
        <p className="info">
          Pricing-Rate
        </p>

      </div>
    </div>
  <div className="pricing row">
      <div className="column">
        <h4 className="info">
          Downloaded Data To TorrentQL
        </h4>
      </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          All torrents downloaded
        </em>
      </div>
        <div className="column">
          <h5>FREE</h5>
        </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          All data transfer in
        </em>
      </div>
      <div className="column">
        <h5>FREE</h5>
      </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <h4 className="info">
          Uploaded Data to Internet From TorrentQL
        </h4>
      </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          Up to 10 GB / Month
        </em>
      </div>
        <div className="column">
          <h5>$0 per GB</h5>
        </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          Next 9.999 GB / Month
        </em>
      </div>
        <div className="column">
          <h5>$0.05 per GB</h5>
        </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          Next 40 GB / Month
        </em>
      </div>
      <div className="column">
        <h5>$0.07 per GB</h5>
      </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          Next 100 GB / Month
        </em>
      </div>
      <div className="column">
        <h5>$0.085 per GB</h5>
      </div>
    </div>
    <div className="pricing row">
      <div className="column">
        <em className="info">
          Greater than 150 TB / Month
        </em>
      </div>
      <div className="column">
        <h5>$0.09 per GB</h5>
      </div>
    </div>
    </div>
      <style jsx>{`
        .wrapper {
          max-width: 768px;
        }
        .spacing {
          margin-bottom: 10px;
        }
        .column {
          justify-content: center;
          margin: 3px;
          background-color: #EDF1F5;
          display: flex;
          width: 100%;
        }
        .pricing {
          background-color: white;
          display: flex;
          height: 75px;
        }
        .info, h5 { 
          margin-top: 25px;
        }
        .column:nth-child(even) {
          background-color: #F5F7FA;
        }
      `}</style> 
  </Main>
  </>
);

export default Pricing;
