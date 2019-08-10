import React from 'react';
import Router from 'next/router';
import { IS_LOGGED_IN_QUERY } from '../apollo/queries';

const getIsLoggedIn = async (apolloClient) => {
  const result = await apolloClient.query({
    query: IS_LOGGED_IN_QUERY,
  });
  const { data: { isLoggedIn } } = result;
  return isLoggedIn;
};

interface IOptions {
  inverse: boolean;
}

const withAuth = (Component: React.ComponentType, options: IOptions = { inverse: false }) => (
  class WithAuth extends React.Component<{ isLoggedIn: boolean }> {
    static async getInitialProps({ res, apolloClient }) {
      const isLoggedIn = await getIsLoggedIn(apolloClient);
      if (options.inverse) {
        if (isLoggedIn) {
          if (!process.browser) {
            res.redirect('/dashboard');
          } else {
            Router.push('/dashboard');
          }
        }
      } else {
        if (!isLoggedIn) {
          if (!process.browser) {
            res.redirect('/login');
          } else {
            Router.push('/login');
          }
        }
      }
      return {
        isLoggedIn,
      };
    }

    render() {
      const { isLoggedIn } = this.props;
      if (options.inverse) {
        return !isLoggedIn && <Component />;
      }
      return isLoggedIn && <Component />;
    }
  }
);

export default withAuth;
