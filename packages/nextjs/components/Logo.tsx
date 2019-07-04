import React, { StatelessComponent } from 'react';
import Link from 'next/link';
import logo from '../static/icon-left-font.png';
import logoAbove from '../static/icon-above-font.svg';

export const Logo: StatelessComponent<React.HTMLAttributes<HTMLAnchorElement>> = props => (
  <Link href="/">
    <a {...props}>
      <style jsx>{`
        a {
          display: inline-block;
          background: url(${logo}) no-repeat;
          background-position: -30px 50%;
          background-size: cover;
          width: 240px;
          height: 50px;
        }
      `}</style>
    </a>
  </Link>
);

export const LogoAbove: StatelessComponent<React.HTMLAttributes<HTMLAnchorElement>> = props => (
  <Link href="/">
    <a {...props}>
      <style jsx>{`
        a {
          display: inline-block;
          background: url(${logoAbove}) no-repeat;
          background-position: 50% -50px;
          background-size: cover;
          width: 200px;
          height: 100px;
        }
      `}</style>
    </a>
  </Link>
);
