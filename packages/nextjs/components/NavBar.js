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
          <div className="d-none-mobile">
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
          </div>
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
          a {
            transition: color 0.2s ease;
            text-decoration: none;
          }
          .left a {
            color: inherit;
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .right a {
            color: #666;
            font-weight: 500;
          }
          div a:hover {
            color: inherit;
          }
          .center {
            flex: 1;
          }
          .right a {
            margin-right: 25px;
          }
          .d-none-mobile {
            display: none;
          }
          @media(min-width: 550px) {
            .d-none-mobile {
              display: inline-block;
            }
          }
        `}</style>
      </nav>
    );
  }
}

export default NavBar;
