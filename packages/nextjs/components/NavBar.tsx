import React, { useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Logo } from './Logo';

interface INavBarItem {
  name: string;
  url: string;
}

const NavBar: React.FunctionComponent<{
  items: INavBarItem[],
  router: any,
}> = ({
  items,
  router,
}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo-burger-wrapper">
          <Logo />
          { items.length ? <NavBarBurger
            open={open}
            onClick={() => toggle()}
          /> : null }
        </div>
        <ul className="tabs">
          { items.map(item => (
            <li key={item.url}>
              <Link href={item.url}>
                <a className={router.pathname === item.url && 'active'}>
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
          border-bottom: 1px solid #ddd;
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
          font-size: 20px;
          font-weight: 600;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .tabs li:last-child a {
          color: var(--primary);
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
            color: var(--black);
            font-size: 16px;
            margin-bottom: 0;
            margin-right: 15px;
          }
          .tabs li:last-child a {
            color: var(--black);
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
        width: 35px;
        height: 35px;
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
