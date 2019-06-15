import { Component } from 'react';
import jsCookie from 'js-cookie';
import Router from 'next/router';

class Logout extends Component {
  static async getInitialProps({ res, apolloClient }) {
    if (!process.browser) {
      await apolloClient.resetStore();
      res.clearCookie('token');
      res.redirect('/login');
    } else {
      await apolloClient.resetStore();
      jsCookie.remove('token');
      Router.push('/login');
    }
    return {};
  }

  render() {
    return null;
  }
}

export default Logout;
