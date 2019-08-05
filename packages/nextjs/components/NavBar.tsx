import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useQuery } from 'react-apollo-hooks';
import { IS_LOGGED_IN_QUERY } from '../apollo/queries';
import { Logo } from './Logo';

const NavBar: React.FunctionComponent<{
  router: any,
  noBoxShadow?: boolean,
}> = ({
  router,
  noBoxShadow,
}) => {
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
        <div className="logo-burger-wrapper">
          <Logo />
          <NavBarBurger
            open={open}
            onClick={() => toggle()}
          />
        </div>
        <ul className="tabs">
          { items.map(item => (
            <li key={item.url}>
              <Link href={item.url}>
                <a className={router.pathname === item.url ? 'active' : undefined}>
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
          box-shadow: ${!noBoxShadow && '#fff 0 -15px, rgba(0,0,0,0.1) 0 0 15px'};
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 15px;
          padding-bottom: 15px;
        }
        .logo-burger-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .tabs {
          display: ${open ? 'block' : 'none'};
          list-style-type: none;
          margin: 0;
          padding: 0;
          margin-top: 15px;
        }
        .tabs li a {
          display: flex;
          color: var(--black);
          background-color: var(--white);
          border: 1px solid var(--gray);
          border-radius: 5px;
          padding: 8px;
          font-weight: 600;
          border-radius: 5px;
          margin-bottom: 8px;
        }
        .tabs li:last-child a {
          color: var(--white);
          background-color: var(--primary);
          border-color: var(--primary);
          margin-bottom: 0;
        }
        @media(min-width: 768px) {
          .wrapper {
            flex-direction: row;
            align-items: center;
          }
          .wrapper-open {
            padding-bottom: 10px;
          }
          .logo-burger-wrapper :global(.burger) {
            display: none;
          }
          .tabs {
            display: flex;
            align-items: center;
            margin-top: 0;
          }
          .tabs li a {
            display: inline-block;
            border: 0;
            color: var(--black);
            background-color: var(--white);
            padding: 0;
            margin-bottom: 0;
            margin-right: 15px;
          }
          .tabs li:last-child a {
            color: var(--black);
            background-color: var(--white);
            margin-bottom: 0;
            margin-right: 0;
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
    tabIndex={0}
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
        cursor: pointer;
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
