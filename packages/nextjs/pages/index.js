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
        <p className="tagline">Download and seed torrents on a 1 Gb/s OVH network.</p>
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
        font-size: 24px;
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
          margin-top: 75px;
          margin-bottom: 75px;
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
  description: `Use our dashboard to do pretty much everything
    from viewing, adding, and deleting torrents, to
    changing your account and security settings.`,
}, {
  title: 'Powerful GraphQL API',
  description: `Build powerful applications with our easy to
    use GraphQL API. Let us handle the heavy lifting when it comes
    to downloading and seeding torrents.`,
}, {
  title: 'On-demand billing',
  description: `Pay per gigabyte stored and uploaded instead of
    a fixed cost per month. Download traffic is always free.`,
}, {
  title: 'Tier 1 network',
  description: `We use a load balanced cluster of 1 Gb/s dedicated
  servers in Gravelines, France. OVH has one of the best networks in
  the world for peer to peer traffic.`,
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
      @media(min-width: 1024px) {
        .feature {
          width: 75%;
        }
      }
    `}</style>
  </div>
);

export default Index;
