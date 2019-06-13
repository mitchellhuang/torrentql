import { Component } from 'react';
import cookie from 'cookie';
import Router from 'next/router';

class Logout extends Component {
  static async getInitialProps({ res, apolloClient }) {
    if (!process.browser) {
      res.clearCookie('token');
      res.redirect('/login');
    } else {
      await apolloClient.resetStore();
      document.cookie = cookie.serialize('token', '', { expires: new Date(0) });
      Router.push('/login');
    }
    return {};
  }

  render() {
    return null;
  }
}

export default Logout;
