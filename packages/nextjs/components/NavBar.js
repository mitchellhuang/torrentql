import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Logo } from './Logo';

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
          <button type="button" onClick={() => toggle()}>
            <NavBarBurger open={open} />
          </button>
        </div>
        <ul className={open ? 'tabs' : 'tabs hidden'}>
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
          min-height: 50px;
          background: white;
          position: sticky;
          top: 0;
          margin: 0;
          width: 100vw;
          box-shadow: #fff 0 -15px, rgba(0,0,0,0.1) 0 0 15px;
        }
        .wrapper {
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tabs {
          list-style-type: none;
          margin: 0;
          padding: 0;
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
        .burger-logo-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        button {
          background: none;
          border: none;
          outline: none;
        }
        @media(max-width: 767px) {
          .tabs {
            text-align: center;
          }
          .tabs li {
            border: 2px solid var(--lightGray);
            border-radius: 5px;
            padding: 8px;
            margin: 8px;
          }
          .tabs li:last-child {
            background-color: var(--primary);
          }
          .tabs li:last-child a {
            color: white;
          }
        }
        @media(min-width: 768px) {
          .hidden {
            visibility: visible;
          }
          button {
            padding: 0;
          }
          .wrapper {
            flex-direction: row;
            align-items: center;
          }
          :global(.logo) {
            margin-bottom: 0;
          }
          .tabs {
            display: flex;
            align-items: center;
          }
          .tabs li {
            float: left;
          }
          .tabs li a {
            color: var(--black);
            font-size: 20px;
          }
          .tabs li:not(:last-child) a {
            margin-bottom: 0;
            margin-right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

const NavBarBurger = ({ open }) => (
  <div className="burger">
    <div className={open ? 'open bar' : 'bar'} />
    <div className={open ? 'open bar' : 'bar'} />
    <style jsx>{`
      .burger {
        margin-right: -9px;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      .bar {
        width: 22px;
        height: 1px;
        content: "";
        background: black;
        transition-timing-function: ease;
        transition-duration: 550ms;
        transition-property: transform;
      }
      .bar:first-child {
        transform: translateY(-4px) rotate(0deg);
      }
      .bar:last-child {
        transform: translateY(4px) rotate(0deg);
      }
      .open:first-child {
        transform: translateY(1px) rotate(45deg);
      }
      .open:last-child {
        transform: translateY(0px) rotate(-45deg);
      }
      @media(min-width: 768px) {
        .bar {
          visibility: hidden;
          height: 0;
        }
      }
    `}</style>
  </div>
);

export default withRouter(NavBar);
