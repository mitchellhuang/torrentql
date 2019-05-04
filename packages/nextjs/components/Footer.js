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
    <div className="wrapper wrapper-v">
      <div className="logo">
        TorrentQL
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
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
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
        }
        .logo {
          font-size: 24px;
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
