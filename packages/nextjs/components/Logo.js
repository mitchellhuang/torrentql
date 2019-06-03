import React from 'react';
import Link from 'next/link';
import img from '../static/icon-left-font.svg';

const Logo = ({
  className,
}) => (
  <Link href="/">
    <a className={className}>
      <style jsx>{`
        a {
          display: inline-block;
          background: url(${img}) no-repeat;
          background-position: -30px 50%;
          background-size: cover;
          width: 240px;
          height: 50px;
        }
      `}</style>
    </a>
  </Link>
);

export default Logo;
