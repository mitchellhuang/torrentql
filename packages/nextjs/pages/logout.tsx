import { Component } from 'react';
import jsCookie from 'js-cookie';
import Router from 'next/router';

class Logout extends Component {
  static async getInitialProps({ res, apolloClient }) {
    if (!process.browser) {
      await apolloClient.resetStore();
      res.clearCookie('token');
      res.redirect('/');
    } else {
      await apolloClient.resetStore();
      jsCookie.remove('token');
      Router.push('/');
    }
    return {};
  }

  render() {
    return null;
  }
}

export default Logout;
