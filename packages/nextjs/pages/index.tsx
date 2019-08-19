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
        <p className="tagline">Download and seed torrents on a gigabit network.</p>
        <div className="actions">
          <Button href="/signup">Sign up</Button>
          <Button href="/pricing" className="ml-2" outline>View pricing →</Button>
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
        background-color: var(--light-gray);
        width: 100%;
        height: 225px;
        border-radius: 5px;
      }
      .text {
        margin-top: 15px;
      }
      @media(min-width: 768px) {
        .hero {
          align-items: center;
        }
        .feature {
          flex-direction: row;
          align-items: center;
          margin: 100px 0;
        }
        .image {
          width: 400px;
        }
        .text {
          width: 260px;
          height: 170px;
          margin-top: 0;
          margin-right: 25px;
        }
        .tagline {
          font-size: 32px;
        }
      }
    `}</style>
  </div>
);

const features = [{
  title: 'Powerful dashboard',
  description: `Our custom-built dashboard (modeled after Flood UI)
    lets you to manage your torrents, downloads, and account settings.`,
}, {
  title: 'Easy to use API',
  description: `Build robust applications with our easy to use
    GraphQL API and let us handle the leeching and seeding.`,
}, {
  title: 'Elastic billing',
  description: `Pay on-demand for only the resources that you use. We bill you per GiB
    stored per month and per GiB transfered out.`,
}, {
  title: 'Lightning fast servers',
  description: `We run load balanced clusters of 1 Gb/s
    dedicated servers in France on the tier 1 OVH premium network (GRA1).`,
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
        margin-bottom: 25px;
      }
      .feature:last-child {
        margin-bottom: 0;
      }
      .image {
        background-color: var(--light-gray);
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
          margin-bottom: 75px;
        }
        .feature:last-child {
          margin-bottom: 50px;
        }
        .feature:nth-child(2n) {
          flex-direction: row-reverse;
        }
        .text {
          width: 310px;
          margin-top: 25px;
          margin-left: 25px;
        }
        .feature:nth-child(2n) .text {
          margin-left: 0;
          margin-right: 25px;
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
