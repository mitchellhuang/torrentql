import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Logo } from './Logo';
import NavBarBurger from './NavBarBurger';

const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`;

const NavBar = ({ router }) => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
    console.log(open);
  };
  const items = [
    { name: 'Pricing', url: '/pricing' },
    { name: 'Features', url: '/features' },
    { name: 'API', url: '/api' },
  ];
  const finalItem = (data && data.isLoggedIn)
    ? { name: 'Dashboard →', url: '/torrents' }
    : { name: 'Log in →', url: '/login' };
  items.push(finalItem);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="burger-logo-wrapper">
          <Logo className="logo" />
          <div className="burger-wrapper" onClick={toggle.bind(this)}>
            <NavBarBurger open={open} />
          </div>
        </div>
        <ul className={open ? 'tabs pb-1' : 'tabs hidden pb-1'}>
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
        .navbar {
          position: sticky;
          top: 0;
          min-height: 50px;
          background: rgb(238, 238, 238, .5);
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tabs {
          list-style-type: none;
          margin: -8px 0 0 0;
        }
        .tabs li a {
          display: inline-block;
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
        }
        .tabs li:not(:last-child) a {
          margin-bottom: 5px;
        }
        .hidden {
          visibility: hidden;
          height: 0;
        }
        @media(min-width: 768px) {
          .hidden {
            visibility: visible;
          }
          .wrapper {
            flex-direction: row;
            align-items: center;
          }
          :global(.logo) {
            margin-bottom: 0;
          }
          .tabs li {
            float: left;
          }
          .tabs li a {
            color: var(--black);
            font-size: 16px;
          }
          .tabs li:not(:last-child) a {
            margin-bottom: 0;
            margin-right: 15px;
          }
        }
        .burger-logo-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .burger-wrapper {
          margin: 25px 37px 0 0;
        }
      `}</style>
    </div>
  );
};

export default withRouter(NavBar);
