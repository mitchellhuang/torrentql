import React from 'react';
import Link from 'next/link';

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
        TorrentQL
        <div className="copy">
          &copy; 2019 Blue Bits, LLC
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
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        border-top: 1px solid #111;
      }
      .logo {
        color: #000;
        font-weight: 600;
        font-size: 24px;
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
        color: #0366d6;
        font-weight: 600;
      }
      .links li:not(:last-child) a {
        margin-bottom: 10px;
      }
      @media(min-width: 768px) {
        .wrapper {
          flex-direction: row;
          align-items: center;
        }
        .logo {
          margin-bottom: 0;
          font-size: 24px;
        }
        .links li:not(:last-child) a {
          margin-right: 20px;
        }
        .links li {
          float: left;
        }
      }
      @media(min-width: 1280px) {
        .wrapper {
          padding: 35px 0;
        }
      }
    `}</style>
  </div>
);

export default Footer;
