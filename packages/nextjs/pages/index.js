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
      <Button href="/pricing" className="ml-2" white animate>View pricing →</Button>
    </div>
    <div className="example" />
    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 50px;
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
        background-color: var(--lightGray);
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
          width: 325px;
          margin-left: 25px;
        }
      }
      @media(min-width: 1024px) {
        .example {
          width: 350px;
        }
      }
    `}</style>
  </div>
);

const features = [{
  title: 'Simple dashboard',
  description: `Use our dashboard to do pretty much everything
    from viewing, adding, and deleting torrents, to
    changing your account and security settings.`,
}, {
  title: 'Powerful GraphQL API',
  description: `Build powerful applications with our easy to
    use GraphQL API and let us handle the heavy lifting for you.`,
}, {
  title: 'On-demand billing',
  description: `Pay per gigabyte stored and uploaded instead of
    a fixed cost per month. Download traffic will always be free.`,
}, {
  title: 'Tier 1 network',
  description: `We use a load balanced cluster of 1 Gb/s dedicated
  servers in Gravelines, France. The OVH network is regarded as one
  of the best networks in the world for peer to peer traffic.`,
}];

const Features = (
) => (
  <div className="features">
    {features.map(feature => (
      <div key={feature.title} className="feature">
        <div className="image" />
        <div className="text">
          <h4 className="title">
            {feature.title}
          </h4>
          <p className="description">
            {feature.description}
          </p>
        </div>
      </div>
    ))}
    <style jsx>{`
      .features {
        display: flex;
        flex-direction: column;
      }
      .feature {
        display: flex;
        flex-direction: column;
      }
      .feature:not(last-child) {
        margin-bottom: 25px;
      }
      .text {
        width: 400px;
      }
      .image {
        background-color: var(--lightGray);
        height: 200px;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 15px;
      }
      .title {
        margin-bottom: 15px;
      }
      @media(min-width: 768px) {
        .features {
          align-items: center;
        }
        .feature {
          flex-direction: row;
        }
        .feature:not(last-child) {
          margin-bottom: 50px;
        }
        .feature:nth-child(2n) {
          flex-direction: row-reverse;
        }
        .text {
          padding-top: 15px;
          padding-left: 25px;
        }
        .feature:nth-child(2n) .text {
          padding-left: 0;
          padding-right: 25px;
        }
        .image {
          width: 400px;
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
);

export default Index;
