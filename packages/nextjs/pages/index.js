import React from 'react';
import Main from '../layouts/Main';
import Button from '../components/Button';

const Index = () => (
  <Main>
    <div className="wrapper">
      <Hero />
      <Features />
    </div>
  </Main>
);

const Hero = () => (
  <div className="hero">
    <div className="info">
      <h1 className="tagline">Download and seed<br />torrents on a 1 Gb/s<br /> OVH network.</h1>
      <div className="tagline-more">
        <p className="tagline-price">Upload starting at $0.0075 / GB.</p>
        <p className="tagline-price">Storage at $0.01 / GB / month.</p>
      </div>
      <Button href="/signup" animate>Sign up</Button>
      <Button href="/pricing" className="ml-10" white animate>View pricing →</Button>
    </div>
    <div className="example" />
    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 25px;
      }
      .tagline {
        font-size: 24px;
        margin-top: 15px;
        margin-bottom: 15px;
        font-weight: 600;
      }
      .tagline-more {
        display: none;
        font-size: 18px;
        margin-bottom: 15px;
      }
      .tagline-price {
        margin: 0;
      }
      .tagline-price:not(:last-child) {
        margin-bottom: 5px;
      }
      .example {
        background-color: var(--black);
        width: 100%;
        height: 200px;
        border-radius: 5px;
      }
      @media(min-width: 768px) {
        .hero {
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding-top: 75px;
          padding-bottom: 75px;
        }
        .tagline {
          font-size: 32px;
        }
        .tagline-more {
          margin: 15px 0;
        }
        .example {
          width: 350px;
          margin-left: 25px;
        }
      }
    `}</style>
  </div>
);

const Features = (
) => (
  <div className="features">
    <h2 className="title">How it works</h2>
    <div className="features-inner">
      <div className="feature first">
        <div className="image" />
        <p className="text">
          Add torrents using our dashboard or API.
        </p>
      </div>
      <div className="feature second">
        <div className="image" />
        <p className="text">
           Our servers will download and seed your torrents.
        </p>
      </div>
      <div className="feature third">
        <div className="image" />
        <p className="text">
          Access your files over HTTPS, SFTP, or FUSE.
        </p>
      </div>
    </div>
    <style jsx>{`
      .features {
        display: flex;
        flex-direction: column;
      }
      .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .features-inner {
        display: flex;
        flex-direction: column;
      }
      .feature {
        display: flex;
        flex-direction: column;
        width: 200px;
      }
      .feature:not(:last-child) {
        margin-bottom: 5px;
      }
      .image {
        width: 65px;
        height: 65px;
        background-color: var(--black);
        border-radius: 5px;
      }
      .text {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .features {
          align-items: center;
          padding: 50px 0;
        }
        .title {
          font-size: 30px;
          margin-bottom: 40px;
        }
        .features-inner {
          flex-direction: row;
          justify-content: center;
          margin-bottom: 50px;
        }
        .feature {
          width: 215px;
          align-items: center;
        }
        .feature:not(:last-child) {
          margin-bottom: 0;
          margin-right: 35px;
        }
        .text {
          text-align: center;
        }
      }
    `}</style>
  </div>
);

export default Index;
