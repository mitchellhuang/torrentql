import { Component } from 'react';
import cookie from 'cookie';
import Router from 'next/router';

class Logout extends Component {
  async componentDidMount() {
    const { client } = this.props;
    await client.resetStore();
    document.cookie = cookie.serialize('token', '', { expires: new Date(0) });
    Router.push('/login');
  }

  render() {
    return null;
  }
}

export default Logout;
