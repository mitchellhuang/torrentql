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
    <div className="feature">
      <div className="text">
        <p className="tagline">Download and seed torrents on a 1 Gb/s network.</p>
        <div className="actions">
          <Button href="/signup" animate>Sign up</Button>
          <Button href="/pricing" className="ml-2" white animate>View pricing →</Button>
        </div>
      </div>
      <div className="image" />
    </div>
    <style jsx>{`
      .hero {
        display: flex;
        flex-direction: column;
        margin-bottom: 35px;
      }
      .feature {
        display: flex;
        flex-direction: column-reverse;
      }
      .tagline {
        font-size: 28px;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 15px;
      }
      .image {
        background-color: var(--lightGray);
        width: 100%;
        height: 225px;
        border-radius: 5px;
      }
      .text {
        padding-top: 15px;
      }
      @media(min-width: 768px) {
        .hero {
          align-items: center;
        }
        .feature {
          flex-direction: row;
          align-items: center;
          padding: calc(100px - 15px) 0 100px 0;
        }
        .image {
          width: 60%;
        }
        .text {
          width: 40%;
          padding-right: 15px;
        }
        .tagline {
          font-size: 32px;
        }
      }
    `}</style>
  </div>
);

const features = [{
  title: 'Easy to use dashboard',
  description: `Use our dashboard to view, add, and delete torrents
  and manage your account settings and API keys.`,
}, {
  title: 'Powerful GraphQL API',
  description: `Build robust applications with our modern
    GraphQL API and let us handle the heavy lifting.`,
}, {
  title: 'On-demand billing',
  description: `Pay per gigabyte stored and uploaded instead of
    a fixed cost per month. No need to pay for resources that you don't use.`,
}, {
  title: 'Lightning fast network',
  description: `We run clusters of 1 Gb/s dedicated servers in France and
  Germany.`,
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
      .image {
        background-color: var(--lightGray);
        height: 200px;
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
          width: 100%;
          max-width: 960px;
        }
        .feature:not(last-child) {
          margin-bottom: 50px;
        }
        .feature:nth-child(2n) {
          flex-direction: row-reverse;
        }
        .text {
          width: 50%;
          padding-top: 15px;
          padding-left: 25px;
        }
        .feature:nth-child(2n) .text {
          padding-left: 0;
          padding-right: 25px;
        }
        .image {
          width: 50%;
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
);

export default Index;
