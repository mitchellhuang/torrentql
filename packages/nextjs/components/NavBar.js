import React, { Component } from 'react';
import Link from 'next/link';
import Button from './Button';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    return (
      <nav>
        <div className="left">
          <Link href="/">
            <a>TorrentQL</a>
          </Link>
        </div>
        <div className="center" />
        <div className="right">
          <Link href="/features">
            <a>Features</a>
          </Link>
          <Link href="/pricing">
            <a>Pricing</a>
          </Link>
          <Link href="/network">
            <a>Network</a>
          </Link>
          <Link href="/api">
            <a>API</a>
          </Link>
          <Button href="/login">
            Login
          </Button>
        </div>
        <style jsx>{`
          nav {
            display: flex;
            align-items: center;
            padding: 15px;
          }
          nav a {
            transition: color 0.2s ease;
            text-decoration: none;
          }
          nav .left a {
            color: inherit;
            font-size: 22px;
            font-weight: 600;
          }
          nav .right a {
            color: #666;
            font-weight: 500;
          }
          nav div a:hover {
            color: inherit;
          }
          nav .center {
            flex: 1;
          }
          nav .right a:not(:last-child) {
            margin-right: 25px;
          }
        `}</style>
      </nav>
    );
  }
}

export default NavBar;
