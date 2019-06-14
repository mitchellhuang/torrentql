import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useQuery } from 'react-apollo-hooks';
import { IS_LOGGED_IN_QUERY } from '../apollo/queries';
import { Logo } from './Logo';

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
    ? { name: 'Dashboard →', url: '/dashboard' }
    : { name: 'Log in →', url: '/login' };
  items.push(finalItem);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo-burger-wrapper">
          <Logo />
          <NavBarBurger
            open={open}
            onClick={() => toggle()}
          />
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
          display: block;
          background: white;
          position: sticky;
          top: 0;
          margin: 0;
          width: 100vw;
          box-shadow: #fff 0 -15px, rgba(0,0,0,0.1) 0 0 15px;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 15px;
        }
        .logo-burger-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .tabs {
          list-style-type: none;
          margin: 0;
          padding: 0;
          margin-top: 10px;
        }
        .tabs li {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--lightGray);
          border-radius: 5px;
          padding: 8px;
        }
        .tabs li:not(:last-child) {
          margin-bottom: 8px;
        }
        .tabs li:last-child {
          background-color: var(--primary);
          border-color: var(--primary);
        }
        .tabs li:last-child a {
          color: var(--white);
        }
        .tabs li a {
          display: inline-block;
          color: var(--black);
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
        }
        .hidden {
          display: none;
        }
        @media(min-width: 768px) {
          .wrapper {
            flex-direction: row;
            align-items: center;
          }
          .logo-burger-wrapper :global(.burger) {
            display: none;
          }
          .tabs {
            display: flex;
            align-items: center;
            margin-top: 0;
          }
          .tabs li {
            display: inline-block;
            border: none;
            padding: 0;
          }
          .tabs li:not(:last-child) {
            margin-bottom: 0;
            margin-right: 15px;
          }
          .tabs li:last-child {
            background-color: var(--white);
          }
          .tabs li:last-child a {
            color: var(--black);
          }
          .tabs li a {
            font-size: 18px;
          }
          .hidden {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

const NavBarBurger = ({
  open,
  onClick,
}) => (
  <div
    className="burger"
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
  >
    <div className={open ? 'open bar' : 'bar'} />
    <div className={open ? 'open bar' : 'bar'} />
    <style jsx>{`
      .burger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        margin-right: -9px;
        outline: 0;
      }
      .bar {
        width: 22px;
        height: 1px;
        background: var(--black);
        transition: transform 550ms ease;
      }
      .bar:first-child {
        transform: translateY(-4px);
      }
      .bar:last-child {
        transform: translateY(4px);
      }
      .open:first-child {
        transform: translateY(1px) rotate(45deg);
      }
      .open:last-child {
        transform: rotate(-45deg);
      }
    `}</style>
  </div>
);

export default withRouter(NavBar);
