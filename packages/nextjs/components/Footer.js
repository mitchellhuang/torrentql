import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer">
        <div className="links">
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
          <Link href="/terms">
            <a>Terms</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>
          <Link href="/dmca">
            <a>DMCA</a>
          </Link>
        </div>
      </div>
    </div>
    <style jsx>{`
      footer {
      }
      .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 75px;
      }
      .links a {
        color: #666;
        font-weight: 500;
        text-decoration: none;
      }
      .links a {
        transition: color 0.2s ease;
      }
      .links a:hover {
        color: inherit;
      }
      .links a:not(:last-child) {
        margin-right: 20px;
      }
      .copy {
        font-size: 16px;
      }
    `}</style>
  </footer>
);

export default Footer;
