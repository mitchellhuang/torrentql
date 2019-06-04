import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Logo from './Logo';

const IS_LOGGED_IN_QUERY = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const NavBar = ({ router }) => {
  const { data } = useQuery(IS_LOGGED_IN_QUERY);
  const items = [{
    name: 'Pricing',
    url: '/pricing',
  }, {
    name: 'Features',
    url: '/features',
  }, {
    name: 'API',
    url: '/api',
  }];
  if (data && data.isLoggedIn) {
    items.push({
      name: 'Dashboard →',
      url: '/dashboard',
    });
  } else {
    items.push({
      name: 'Log in →',
      url: '/login',
    });
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <Logo className="logo" />
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
        .navbar {
          padding: 15px 0;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        :global(.logo) {
          margin-bottom: 15px;
        }
        .tabs {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .tabs li a {
          display: block;
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
        }
        .tabs li:not(:last-child) a {
          margin-bottom: 5px;
        }
        @media(min-width: 768px) {
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
      `}</style>
    </div>
  );
};

export default withRouter(NavBar);
