import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const items = [{
  name: 'FAQ',
  url: '/faq',
}, {
  name: 'Terms',
  url: '/terms',
}, {
  name: 'Privacy',
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
          &copy; 2019 TorrentQL, LLC
        </div>
      </div>
      <ul className="links">
        { items.map(item => (
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
    <style jsx>{`
      .footer {
        padding: 15px 0;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
      .logo {
        margin-bottom: 15px;
      }
      .copy {
        font-size: 12px;
        font-weight: 400;
        margin-top: 5px;
      }
      .links {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .links li a {
        display: block;
        font-size: 18px;
        font-weight: 600;
      }
      .links li:not(:last-child) a {
        margin-bottom: 5px;
      }
      @media(min-width: 768px) {
        .wrapper {
          flex-direction: row;
          align-items: center;
          padding-top: 35px;
          padding-bottom: 35px;
        }
        .logo {
          margin-bottom: 0;
        }
        .links li a {
          font-size: 16px;
        }
        .links li:not(:last-child) a {
          margin-bottom: 0;
          margin-right: 15px;
        }
        .links li {
          float: left;
        }
      }
    `}</style>
  </div>
);

export default Footer;
