import React from 'react';
import Link from 'next/link';

interface Tab {
  name: string;
  url: string;
}

interface ITabs extends React.HTMLProps<HTMLDivElement> {
  tabs: Tab[];
  isActive: (url: string) => boolean;
}

const Tabs :React.FunctionComponent<ITabs> = ({ tabs, isActive }) => (
  <>
    <ul>
      {tabs.map(item => (
        <li key={item.url}>
          <Link href={item.url}>
            <a className={isActive(item.url) && 'active'}>
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      ul {
        display: block;
        list-style-type: none;
        padding: 0;
        margin: 0;
        overflow: auto;
        white-space: nowrap;
      }
      li {
        display: inline-block;
      }
      li a {
        display: block;
        color: var(--primary);
        font-size: 16px;
        font-weight: 600;
        padding: 10px 0;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
      }
      li:not(:last-child) {
        margin-right: 15px;
      }
      li > .active {
        color: var(--black);
        border-bottom-color: var(--gray);
      }
    `}</style>
  </>
);

export default Tabs;
