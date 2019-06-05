import React from 'react';
import Link from 'next/link';

const tabs = [{
  name: 'Torrents',
  url: '/torrents',
}, {
  name: 'Downloads',
  url: '/downloads',
}, {
  name: 'Settings',
  url: '/settings',
}];

const Tabs = () => (
  <ul>
    { tabs.map(item => (
      <li key={item.url}>
        <Link href={item.url}>
          <a>
            {item.name}
          </a>
        </Link>
      </li>
    )) }
    <style jsx>{`
      ul {
        display: block;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        font-weight: 600;
      }
      li:not(:last-child) {
        margin-bottom: 15px;
      }
    `}</style>
  </ul>
);

export default Tabs;
