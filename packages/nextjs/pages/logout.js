import { Component } from 'react';
import cookie from 'cookie';
import Router from 'next/router';

class Logout extends Component {
  static async getInitialProps({ res, apolloClient }) {
    if (!process.browser) {
      await apolloClient.resetStore();
      res.clearCookie('token');
      res.redirect('/login');
    }
    return {};
  }

  async componentDidMount() {
    const { apolloClient } = this.props;
    await apolloClient.resetStore();
    document.cookie = cookie.serialize('token', '', { expires: new Date(0) });
    Router.push('/login');
  }

  render() {
    return null;
  }
}

export default Logout;
