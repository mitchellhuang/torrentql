import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const getStarted = [{
  name: 'Log in',
  url: '/login',
  prefetch: true,
}, {
  name: 'Sign up',
  url: '/signup',
  prefetch: true,
}, {
  name: 'FAQ',
  url: '/faq',
}];

const productItems = [{
  name: 'Pricing',
  url: '/pricing',
}, {
  name: 'Features',
  url: '/features',
}, {
  name: 'API',
  url: '/api',
}];

const companyItems = [{
  name: 'Contact us',
  url: '/contact',
}, {
  name: 'Terms of service',
  url: '/terms',
}, {
  name: 'Privacy policy',
  url: '/privacy',
}, {
  name: 'DMCA',
  url: '/dmca',
}];

const Footer = () => (
  <div className="footer">
    <div className="wrapper">
      <div className="logo">
        <Logo />
        <div className="copy">
          &copy; 2019 TorrentQL
        </div>
      </div>
      <div className="group get-started">
        <h4 className="header">
          Get Started
        </h4>
        <ul className="links">
          { getStarted.map(item => (
            <li key={item.url}>
              <Link prefetch={item.prefetch} href={item.url}>
                <a>
                  {item.name}
                </a>
              </Link>
            </li>
          )) }
        </ul>
      </div>
      <div className="group product">
        <h4 className="header">
          Product
        </h4>
        <ul className="links">
          { productItems.map(item => (
            <li key={item.url}>
              <Link href={item.url}>
                <a>
                  {item.name}
                </a>
              </Link>
            </li>
          )) }
        </ul>
      </div>
      <div className="group company">
        <h4 className="header">
          Company
        </h4>
        <ul className="links">
          { companyItems.map(item => (
            <li key={item.url}>
              <Link href={item.url}>
                <a>
                  {item.name}
                </a>
              </Link>
            </li>
          )) }
        </ul>
      </div>
    </div>
    <style jsx>{`
      .footer {
        padding: 15px 0;
      }
      .wrapper {
        display: flex;
        border-top: 1px solid var(--lightGray);
        flex-direction: column;
        align-items: flex-start;
      }
      .logo {
        margin: 15px 0;
      }
      .copy {
        font-size: 12px;
        font-weight: 400;
        margin-top: 5px;
      }
      .group:not(:last-child) {
        margin-bottom: 15px;
      }
      .header {
        font-size: 16px;
        text-transform: uppercase;
        color: #999;
        margin-bottom: 15px;
      }
      .links {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .links li a {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
      }
      .links li:not(:last-child) a {
        margin-bottom: 15px;
      }
      @media(min-width: 768px) {
        .wrapper {
          padding-top: 50px;
          padding-bottom: 50px;
          flex-direction: row;
        }
        .logo {
          flex: 2;
          margin: 0;
        }
        .group {
          flex: 1;
        }
        .group:not(:last-child) {
          margin-bottom: 0;
        }
        .logo {
          margin-bottom: 0;
        }
        .links li a {
          font-size: 16px;
        }
      }
    `}</style>
  </div>
);

export default Footer;
