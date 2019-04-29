import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

const items = [{
  name: 'Home',
  url: '/',
}, {
  name: 'Features',
  url: '/features',
}, {
  name: 'Pricing',
  url: '/pricing',
}, {
  name: 'API',
  url: '/api',
}, {
  name: 'Login',
  url: '/login',
}];

export default withRouter(({ router }) => (
  <div className="navbar">
    <div className="wrapper">
      <div className="logo">
        TorrentQL
      </div>
      <ul className="tabs">
        { items.map(item => (
          <li key={item.url}>
            <Link href={item.url}>
              <a className={router.pathname === item.url ? 'active' : null}>
                {item.name}
              </a>
            </Link>
          </li>
        )) }
      </ul>
    </div>
    <style jsx>{`
      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .logo {
        color: #111;
        font-weight: 600;
        font-size: 28px;
        margin-bottom: 15px;
      }
      .tabs {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .tabs li {
        float: left;
      }
      .tabs li a {
        display: block;
        color: #111;
        padding: 10px;
        font-weight: 600;
        border: 2px solid transparent;
        border-radius: 5px;
      }
      .tabs li .active {
        border: 2px solid #111;
      }
      @media(min-width: 768px) {
        .wrapper {
          flex-direction: row;
          align-items: center;
        }
        .logo {
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
));
