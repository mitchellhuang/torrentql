/* tslint:disable */

import { Component } from 'react';
import Router from 'next/router';
import { IS_LOGGED_IN_QUERY } from '../apollo/queries';

const getIsLoggedIn = async (apolloClient) => {
  const result = await apolloClient.query({
    query: IS_LOGGED_IN_QUERY,
  });
  const { data: { isLoggedIn } } = result;
  return isLoggedIn;
};

const withAuth = ComposedComponent => (
  class withAuth extends Component {
    static async getInitialProps({ res, apolloClient }) {
      const isLoggedIn = await getIsLoggedIn(apolloClient);
      if (!isLoggedIn) {
        if (!process.browser) {
          res.redirect('/login');
        } else {
          Router.push('/login');
        }
      }
      return {
        isLoggedIn,
      };
    }

    render() {
      const { isLoggedIn } = this.props;
      return isLoggedIn ? <ComposedComponent /> : null;
    }
  }
);

export default withAuth;

/* tslint:enable */
